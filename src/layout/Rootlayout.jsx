import { useEffect } from "react";
import { Outlet } from "react-router";
import { auth } from "../firebase.config";
import Navbar from "../Navbar";

const Rootlayout = () => {
  useEffect(() =>{
    console.log(auth.currentUser)
  },[auth.currentUser])
  return (
    <>
      <Navbar/>
      <Outlet />
      <h2>Footer</h2>
    </>
  );
};

export default Rootlayout;
