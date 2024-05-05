import * as React from "react";
import Table from "@mui/material/Table";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon
} from "@heroicons/react/20/solid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PageHeading from "./PageHeading";
import Layout from "./Layout";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function BasicTable() {
  const [tasks, setTask] = React.useState([]);
  const [users, setUser] = React.useState([]);

  React.useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const getTasks = async () => {
    const response = await axios.get("http://localhost:5000/task");
    setTask(response.data);
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/task/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <PageHeading children={"Dashboard"} button={(
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <NavLink to={"/add"} className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Task
          </button>
        </NavLink>
      </div>
      )}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-indigo-600">
            <TableRow>
              <TableCell style={{ color: "white" }}>Tugas</TableCell>
              <TableCell style={{ color: "white" }} align="inherit">
                Detail Tugas
              </TableCell>
              <TableCell style={{ color: "white" }} align="inherit">
                Petugas
              </TableCell>
              <TableCell style={{ color: "white" }} align="inherit">
                Tgl Mulai
              </TableCell>
              <TableCell style={{ color: "white" }} align="inherit">
                Tgl Selesai
              </TableCell>
              <TableCell style={{ color: "white" }} align="inherit">
                Status
              </TableCell>
              <TableCell style={{ color: "white" }} align="inherit"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                hover
                key={task.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.judul_tugas}
                </TableCell>
                <TableCell align="inherit">{task.detail_tugas}</TableCell>
                <TableCell align="inherit">
                  {users.map((user) =>
                    task.user_id === user.id ? user.name : ""
                  )}
                </TableCell>
                <TableCell align="inherit">
                  {formatDate(task.waktu_awal)}
                </TableCell>
                <TableCell align="inherit">
                  {formatDate(task.waktu_akhir)}
                </TableCell>
                <TableCell align="inherit">
                  <span
                    className={`inline-flex items-center rounded-md ${
                      task.status_user === "Selesai"
                        ? "bg-green-600"
                        : task.status_user === "Dalam Penugasan"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    } px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-slate-200`}
                  >
                    {task.status_user}
                  </span>
                </TableCell>
                <TableCell align="inherit">
                  <div className="flex flex-col items-center content-stretch">
                  <NavLink to={`/edit/${task.id}`} className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex flex-grow w-full items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PencilIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </NavLink>
                  <NavLink to={`/task/${task.id}`} className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex flex-grow items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <LinkIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      View
                    </button>
                  </NavLink>
                  <span className="hidden sm:block">
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm("apakah anda yakin ingin menghapus?")
                        ) {
                          deleteTask(task.id);
                        }
                      }}
                      className="inline-flex flex-grow items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-red-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <TrashIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                  </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
