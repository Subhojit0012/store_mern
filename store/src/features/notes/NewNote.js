import React from "react";
import NewNoteForm from "./NewNoteForm";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userApiSlice";

function NewNote() {
  const users = useSelector(selectAllUsers);

  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
}

export default NewNote;
