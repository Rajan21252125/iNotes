import React, { useContext, useState } from 'react';
import NoteContext from '../context/note/NoteContext';

export default function Addnote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    props.showAlert('Added Successfully', 'success');
    setNote({
      title: '',
      description: '',
      tag: '',
    });
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e) => {
    const textareaLineHeight = 24; // Adjust this value based on your textarea's line-height
    const minRows = 1;
    const maxRows = 4;
    const previousRows = e.target.rows;
    e.target.rows = minRows; // Reset rows to calculate the new height

    const currentRows = Math.ceil((e.target.scrollHeight - textareaLineHeight) / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Write Your Notes</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={note.description}
          rows="1"
          onChange={handleTextareaChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="" onChange={handleChange} />
      </div>
      <button disabled={note.title.length<5 || note.description.length<5} type="button" className="btn btn-dark" onClick={handleSubmit}>
        Add Note
      </button>
    </div>
  );
}
