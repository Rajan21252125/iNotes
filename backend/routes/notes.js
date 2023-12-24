const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../module/Notes");

// @route   GET api/notes/fetchallnotes
router.get("/fetchallnots", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Some Internal error" });
  }
});




// Route 2: Add note to spcific user POST api/notes/addnote
router.post(
  "/addnote",
  fetchUser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title Should Conatin Atleast 3 Charachter"),
    body("description")
      .isLength({ min: 8 })
      .withMessage("Description Should Conatin Atleast 8 Charachter"),
  ],
  async (req, res) => {
    // wrapp the al validation error in one variable
    const result = validationResult(req);
    // check if there is any error in validation
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await notes.save();
      // const saveNote = await Notes.create({
      //     title: req.body.title,
      //     description: req.body.description,
      //     tag: req.body.tag,
      // })
      res.json(saveNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Some Internal error" });
    }
  }
);

// Route 3 : to update the note using PUT /api/notes/updatenote/:id
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Some Internal error" });
  }
});
// Route 4 : to update the note using DELETE /api/notes/deletenote/:id
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Your note successfully deleted", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Some Internal error" });
  }
});

module.exports = router;
