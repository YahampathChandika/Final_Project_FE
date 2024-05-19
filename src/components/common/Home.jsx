import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F8F9FD"
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Home;
