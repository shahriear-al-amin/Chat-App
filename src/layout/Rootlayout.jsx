import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { auth } from "../firebase.config";
import { useSelector } from "react-redux";

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
      <h2>Footer</h2>
    </>
  );
};

export default Rootlayout;
