import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userInfo } from "./Slices/userSlice";

const Login = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [type, settype] = useState(false);
  let [loader , setloader] = useState(false);
  let [data , setdata] = useState({
    mail : "",
    pass : ""
  })
  let handellogin = () => {
    setloader(true);
    if(data.mail && data.pass){
    signInWithEmailAndPassword(auth, data.mail, data.pass)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(userInfo(user))
        localStorage.setItem("user" , JSON.stringify(user))
        setloader(false);
        toast.success("Account Login Succesflly")
        setTimeout(() => {
          navigate("/")
        }, 1000);
      })
      .catch((error) => {
    setloader(false);
    toast.error("Wrong info/name....")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }else{
        alert("enter data")
    }
  };
  let handelmail = (e) => {
    let val = e.target.value;
    setdata((prev) =>({
        ...prev,
        mail : val
    }))
  };
  let handelpass = (e) => {
    let val = e.target.value;
        setdata((prev) =>({
        ...prev,
        pass : val
    }))
  };
  return (
    <div>
    <Toaster position="top-center" reverseOrder={false} />
<div className=' absolute h-[640px] bg-[#ffffff25] w-[100%] z-10 backdrop-blur-[8px] ' role="status"
style={{display : loader? "block" : "none"}}
>
  <svg
    aria-hidden="true"
    className=" h-15 text-gray-200 animate-spin dark:text-[#61a0e9] fill-blue-900 mx-auto mt-[300px]"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
  <span className="sr-only">Loading...</span>
</div>
      <div className="h-[641px] bg-[#101828]  grid items-center justify-center">
        <h1 className="text-[white] mt-[-100px] font-[600] text-[30px]  ml-[170px] relative rotate-[0.2deg]">
          Log-in
        </h1>
        <div className="mt-[-200px] h-[420px] rounded-[10px] w-[450px] bg-[#fffafa15] blur-[px] border-[1px] border-[#444242]">
          <p className="text-[14px] font-[600] mt-[25px] ml-[30px] absolute text-[#e9e9e9]">
            Email Adress
          </p>
          <input
            onChange={handelmail}
            className=" outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[60px] ml-[30px] text-[13px] "
            type="text"
            placeholder="name@gmail.com"
          />
          <p className="text-[14px] font-[600] mt-[115px] ml-[30px] absolute text-[#e9e9e9]">
            Password
          </p>
          <input
            onChange={handelpass}
            className=" outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[150px] ml-[30px] text-[13px] "
            type={type ? "text" : "password"}
            placeholder="Password"
          />
          <i
            onClick={() => settype(!type)}
            className="fa-solid fa-eye absolute mt-[160px] ml-[360px]"
            style={{ display: type ? "block" : "none" }}
          ></i>
          <i
            onClick={() => settype(!type)}
            className="fa-solid fa-eye-slash absolute mt-[160px] ml-[360px]"
            style={{ display: type ? "none" : "block" }}
          ></i>
          <input
            className="bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] p-[10px] mt-[215px] ml-[-140px] text-[13px] h-[15px] "
            type="checkbox"
          />
          <p className="text-[14px] font-[600] mt-[212px] ml-[65px] absolute text-[#e9e9e9]">
            Remember Password
          </p>
          <a
            className="text-[12px] font-[600] mt-[212px] ml-[280px] absolute text-[#00c3ff] hover:underline"
            href="/Signup"
          >
            {" "}
            Create a new Acount?
          </a>
          <button
            onClick={handellogin}
            className="py-[10px] rounded-[5px] text-[14px] font-[600] mt-[270px] ml-[30px] absolute text-[#e9e9e9] bg-[#00a2ff] px-[160px]"
          >
            Log in
          </button>
          <button className="py-[10px] rounded-[5px] text-[14px] font-[600] mt-[345px] ml-[30px] absolute text-[#e9e9e9] bg-[#ffffff1e] px-[55px] flex items-center gap-[10px] cursor-pointer">
            <img className="h-[20px] ml-[-15px]" src="icon.png" alt="" /> Google
          </button>
          <button className="py-[8px] rounded-[5px] text-[14px] font-[600] mt-[345px] ml-[220px] absolute text-[#e9e9e9] bg-[#ffffff1e] px-[55px] flex items-center gap-[10px] cursor-pointer">
            <img className="h-[25px] ml-[-15px]" src="icon2.png" alt="" /> Git
            Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
