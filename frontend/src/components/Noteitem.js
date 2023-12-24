import React , {useContext} from "react";
import NoteContext from "../context/note/NoteContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Noteitem(props) {
  const context = useContext(NoteContext)
  const{ deleteNote } = context
  const {note , update} = props
  return (
    <div className="col-md-3">
    <div className="card my-3">
      <div className="card-body">
        <div className="d-flex d-flex align-items-center">
        <h5 className="card-title me-2">{note.title}</h5>
        {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
        {/* <i className="far fa-trash-alt me-2"></i>
        <i className="fa-regular fa-pen-to-square me-2"></i> */}
        </div>
        <p className="card-text">
            {note.description}
        </p>
        <button className="btn btn-danger btn-sm me-2" onClick={() => {deleteNote(note._id); props.showAlert('Deleted note successfully','success')}}> Delete </button>
        <button className="btn btn-success btn-sm" onClick={() => {update(note); props.showAlert('Updated note successfully','success')}}> Edit </button>
      </div>
    </div>
    </div>
  );
}
