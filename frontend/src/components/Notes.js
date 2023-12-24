import React, { useContext, useEffect, useRef , useState} from "react";
import NoteContext from "../context/note/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  let history = useNavigate();
  const context = useContext(NoteContext);
  const [note, setnote] = useState({id: "" ,etitle:"" , edescription : "" , etag: ""})
  const { notes, getNote , editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }else{
      history('/login')
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const update = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id , etitle: currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
  };
  const handleSubmit = (e) => {
    console.log(note)
    editNote(note.id , note.etitle , note.edescription , note.etag)
    refClose.current.click();
    e.preventDefault();
    props.showAlert("Updated Successfully" , "success")
}
const handleChange = (e) => {
    // console.log(e.target.value)
    setnote({...note , [e.target.name]:e.target.value})
}

  return (
    <div>
      <Addnote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      {/* 
<!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <h1>Write Your Notes</h1>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={note.etitle}
            className="form-control"
            id="etitle"
            name='etitle'
            placeholder=""
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <textarea
            className="form-control"
            value={note.edescription}
            id="edescription"
            name='edescription'
            rows="2"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            value={note.etag}
            id="etag"
            name='etag'
            placeholder=""
            onChange={handleChange}
          />
        </div>
            </div>
            <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleSubmit}>Edit Note</button>
      </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        <div className="container">
        {notes.length === 0 && ("You did not have any note to preview")}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} update={update} showAlert={props.showAlert}/>
        ))}
      </div>
    </div>
  );
}
