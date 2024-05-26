import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "../../pages/Overview";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F8F9FD",
        overflow: "hidden"
      }}
    >
      <Sidebar />
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 40px"
      }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
