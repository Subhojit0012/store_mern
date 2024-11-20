import { store } from "../../app/store";
import { usersApiSlice } from "../users/userApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function Prefetch() {
  useEffect(() => {
    console.log("subscribing");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}

export default Prefetch;
