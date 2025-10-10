import React from "react";
import { useDispatch } from "react-redux";
import { userInfo } from "./Slices/userSlice";
const About = () => {
  let dispatch = useDispatch();
  let handeldatasend = () => {
    dispatch(userInfo({ name: "name" }));
  };
  return(
    <button onClick={handeldatasend} className='px-[30px] py-[10px] bg-[teal]'>Send data</button>

  )

};

export default About;
