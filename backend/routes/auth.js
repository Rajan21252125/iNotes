const express = require("express");
const router = express.Router();
const User = require("../module/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");


// @ROUTE 1:   for the user registeration   GET api/auth/createUser/
// @ROUTE 1:   for the uswe registeration   GET api/auth/createUser/
const success = false;
const JWT_SECRET = "iNotesMadewithReact";
router.post(
  "/createUser",
  [
    // validation for email and length check for name and paasword
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name Should Conatin Atleast 3 Charachter"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Should Conatin Atleast 8 Charachter"),
  ],
  async (req, res) => {
    // wrapp the al validation error in one variable
    const result = validationResult(req);
    // check if there is any error in validation
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: result.array() });
    }
    // first try if there is not error than create a user and add data which come from the body
    try {
      // check email is presnt already to database or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({msg: "This email is already registered with us. Please try to login with this email or try to register with another email."})
      }
      // created a salt to add to password
      const salt = await bcrypt.genSalt(10);
      // hash the password
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      // get the data for jwt token
      // what is jwt token?
      // jwt token is a token which is used to authenticate the user
      // it is a token which is created by the server and send to the user
      // and when user send the token to the server than server check the token is valid or not
      // if token is valid than server send the data to the user
      // and if token is not valid than server send the error to the user
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET , {expiresIn: "1hr"});
      res.json({success:true , token , msg:"successfully created account"});
      // catch the error if there is any error than show that error
    } catch (error) {
      // check email is presnt already to database or not
      console.error(error);
      res.status(500).json({ msg: "Some Internal error" });
    }
    // .then(user => {
    //   res.json(user);
    // }).catch(error => {
    //   if (error.code === 11000) {
    //     // Duplicate key error
    //     return res.status(409).json({ error: 'Email already exists' });
    //   }
    //   // Other error
    //   console.error(error);
    //   res.status(500).json({ error: 'Server error' });
    // });
  }
);

// @ROUTE2: For the login user   GET api/auth/login/
router.post(
  "/login",
  [
    // validation for email and length check for name and paasword
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Should Conatin Atleast 8 Charachter"),
  ],
  async (req, res) => {
    // wrapp the al validation error in one variable
    const result = validationResult(req);
    // check if there is any error in validation
    if (!result.isEmpty()) {
      return res.status(400).json({ msg: result.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!email) {
        return res
          .status(400)
          .json({ msg: "This email is not registered so please register it or use the correct credential to login" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ msg: "Please Try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET);
      res.json({success:true , token , msg:"successfully logged in"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Some Internal error" });
    }
  }
);

// @ROUTE3: For the get user data   GET api/auth/getUser/
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Some Internal error" });
  }
});

module.exports = router;
