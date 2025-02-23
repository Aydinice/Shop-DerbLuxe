import React from "react";
import Navbar from "../../Navbar/ui/Navbar";
import Sidebar from "../../Sidebar/ui/Sidebar";
import Main from "../../Main/ui/Main";
import "./Layout.scss";

export default function Layout() {
  return (
    <div className="Layout">
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
