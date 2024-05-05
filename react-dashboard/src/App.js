import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import TableTasks from "./components/TableTasks";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import ShowTask from "./components/ShowTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TableTasks />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/task/:id" element={<ShowTask />} />
    </Routes>
  );
}

export default App;
