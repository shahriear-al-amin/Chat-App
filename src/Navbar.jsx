import React, { useState } from 'react'
import { FaHome, FaUserAlt } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";




const Navbar = () => {
  const [viewprofile, setviewprofile] = useState(false);
    let navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [active, setActive] = useState("home");
  let handlechatbox = () =>{
  navigate("/messages")
}
  const handleClick = (tab) => {
    setActive(tab);
    
  };
  let handleshow = () => {
    setviewprofile(true);
  };
    let handlecross = () => {
    setviewprofile(false);
  };
  let handlelogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(userInfo(null));
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
              <div
                className="h-[640px] w-[100%] bg-[#ffffff05] absolute z-50 backdrop-blur-[20px] flex items-center justify-center "
                style={{ visibility: viewprofile ? "visible" : "hidden" }}
              >
                <div className="h-[140px] w-[300px] bg-[#05bebe] rounded-[10px]">
                  <div className=" flex">
                    <div className="h-[50px] w-[50px] bg-[#000000] rounded-full ml-[10px] mt-[10px]"></div>
                    <p className=" font-[600] ml-[10px] mt-[13px]">
                      {user.displayName}
                    </p>
                  </div>
                  <p className=" font-[600] absolute text-[11px] mt-[-20px] ml-[70px]">
                    {user.email}
                  </p>
                  <button className="px-[20px] py-[10px] text-[13px] rounded-[5px] mt-[20px] ml-[30px] font-[600] bg-[#09f831]">
                    View Profile
                  </button>
                  <button
                    onClick={handlelogout}
                    className="px-[20px] py-[10px] text-[13px] rounded-[5px] mt-[20px] ml-[20px] font-[600] bg-[#f30909]"
                  >
                    Log Out
                  </button>
                  <i
                    onClick={handlecross}
                    className="fa-solid fa-xmark absolute mt-[-50px] ml-[20px]"
                  ></i>
                </div>
              </div>
     <div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2
        flex justify-around items-center
        w-[260px] h-[65px]
        bg-[#162b25] backdrop-blur-md
        border border-white/20 shadow-lg
        rounded-2xl
        text-[#cccccc] z-50"
      >
        <button
          onClick={() => handleClick("home")}
          className={`transition-all duration-300 text-[9px] ${
            active === "home"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <FaHome size={26} />
          Home
        </button>

        <button
          onClick={() => handleClick("chat")}
          className={`transition-all duration-300 text-[9px] ${
            active === "chat"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <IoChatboxSharp size={26} onClick={handlechatbox}/>
          <p className=" ml-[-2px]">Message</p>
        </button>

        <button
          onClick={() => handleClick("user")}
          className={`transition-all duration-300  text-[9px] ${
            active === "user"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <FaUserAlt size={24} onClick={handleshow} />
          <p className=" mt-[2px]">Profile</p>
        </button>
      </div>
    </div>
  )
}

export default Navbar