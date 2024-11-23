import React from "react";
import NewNoteForm from "./NewNoteForm";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userApiSlice";

function NewNote() {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>No users available</p>;

  const content = <NewNoteForm users={users} />;

  return content;
}

export default NewNote;
