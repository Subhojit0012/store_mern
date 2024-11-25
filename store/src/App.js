import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UserList from "./features/users/UserList";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import EditUser from "./features/users/EditUser";
import NewUser from "./features/users/NewUser";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>

              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUser />} />
              </Route>
            </Route>
            {/* end dash routes */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
