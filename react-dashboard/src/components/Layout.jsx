import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import Topbar from "./Topbar";
import "../App.css";
import { BarChart3, Receipt, UserCircle } from "lucide-react";

const Layout = ({ children, kelas }) => {
  return (
    <React.Fragment>
      <div className={`App flex h-screen rounded-lg m-5 bg-slate-400 overflow-auto`}>
          <Sidebar>
            <SidebarItem icon={<BarChart3 size={20} />} text={"Dashboard"} path={"/"} active />
            <SidebarItem icon={<UserCircle size={20} />} text={"Users"} path={"/users"} />
            <SidebarItem icon={<Receipt size={20} />} text={"Tasks"} path={"/tasks"} />
          </Sidebar>
          <main className={`container px-5 ${kelas}`}>
            <Topbar />
            {children}
          </main>
        </div>
    </React.Fragment>
  );
};

export default Layout;
