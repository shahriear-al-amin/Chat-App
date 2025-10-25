import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../firebase.config";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

const Rootlayout = () => {
    let user = useSelector((state)=>state.user.value)
  let navigator = useNavigate()
  useEffect(() =>{
    if(!user){
      navigator("/login")
    }
  },[auth.currentUser])
  return (
    <>
      <Outlet />
      <Navbar/>
    </>
  );
};

export default Rootlayout;
