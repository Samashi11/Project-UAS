/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import * as React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Layout from "./Layout";
import PageHeading from "./PageHeading";
import axios from "axios";
// import * as dateFormat from "date-format";
import dateFormat, { masks } from "dateformat";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const [users, setUsers] = React.useState([]);

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [uzer, setUser] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // const date = new Date();
  // const year = start.getFullYear();
  // const month = String(start.getMonth() + 1).padStart(2, "0");
  // const day = String(start.getDate()).padStart(2, "0");
  // const formattedDate = `${year} ${month} ${day}`;
  

  const getTaskById = async () => {
    const response = await axios.get(`http://localhost:5000/task/${id}`);
    setTitle(response.data.judul_tugas);
    setDesc(response.data.detail_tugas);
    setUser(response.data.user_id);
    setStart(response.data.waktu_awal);
    setEnd(response.data.waktu_akhir);
  };

  const formattedStart = dateFormat(start, 'yyyy-mm-dd');
  const formattedEnd = dateFormat(end, 'yyyy-mm-dd');
  // console.log(formattedStart);

  React.useEffect(() => {
    getTaskById();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/task/edit/${id}`,
        {
          title: title,
          desc: desc,
          user_id: uzer,
          start: start,
          end: end,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users/role/User");
    setUsers(response.data);
  };

  return (
    <Layout kelas={""}>
      <div className="container px-80">
        <PageHeading children={"Edit Task"} />
        <form className="" onSubmit={updateTask}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="text-md leading-6 text-gray-600">Tambahkan Tugas</p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Judul Tugas
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      autoComplete="title"
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Waktu Mulai
                  </label>
                  <div className="mt-2">
                    <input
                      id="start"
                      name="start"
                      type="date"
                      value={formattedStart}
                      autoComplete="start"
                      onChange={(e) => setStart(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Waktu Selesai
                  </label>
                  <div className="mt-2">
                    <input
                      id="end"
                      name="end"
                      type="date"
                      value={formattedEnd}
                      autoComplete="end"
                      onChange={(e) => setEnd(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Petugas
                  </label>
                  <div className="mt-2">
                    <select
                      id="petugas"
                      name="petugas"
                      autoComplete="petugas-name"
                      onChange={(e) => setUser(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="" hidden></option>
                      {users.map((user) => (
                        <option
                          value={user.id}
                          selected={user.id === uzer ? "true" : "false"}
                        >
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Detail Tugas
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Berikan Deskripsi Tugas.
                  </p>
                </div>

                {/* <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 ">
            <NavLink to={"/"}>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </NavLink>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
