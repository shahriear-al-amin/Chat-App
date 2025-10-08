import React from "react";
import { Outlet } from "react-router";

const Rootlayout = () => {
  return (
    <>
      <h1>Navbar</h1>
      <Outlet />
      <h2>Footer</h2>
    </>
  );
};

export default Rootlayout;
