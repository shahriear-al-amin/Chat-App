import React, { useState } from 'react'
import { auth } from './firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {
    auth
    let [info , setinfo] = useState({
        firstname : "",
        lastname : "",
        mail : "",
        pass : ""
    })
    let [type , settype] = useState(false)
    let [err , seterr] = useState(false)
    let [err1 , seterr1] = useState(false)
    let [err2 , seterr2] = useState(false)
    let [err3 , seterr3] = useState(false)
    let [ckemail ,setckemail] = useState(true)
    let handelfirstname = (e) =>{
            const val = e.target.value
        setinfo((prev) =>({
            ...prev,
            firstname : val
        }));
        if(val.trim() !== ""){
            seterr(false)
        }
    }
    let handellastname = (e) =>{
        const val = e.target.value
        setinfo((prev) =>({
            ...prev,
            lastname : e.target.value
        }));
        if(val.trim() !== ""){
            seterr1(false)
        }
    }
    let handelemail = (e) =>{
        const val = e.target.value
        setinfo((prev) =>({
            ...prev,
            mail : e.target.value
        }));
        if(val.trim() !== ""){
            seterr2(false)
        }
    }
    let handelpass = (e) =>{
        const val = e.target.value
        setinfo((prev) =>({
            ...prev,
            pass : e.target.value
        }));
        if(val.trim() !== ""){
            seterr3(false)
        }
    }
const handlesignup = () => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.mail)) {
    setckemail(true);
  } else {
    setckemail(false);
  }

  if (
    info.firstname === "" ||
    info.lastname === "" ||
    info.mail === "" ||
    info.pass === "" ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.mail)
  ) {
    seterr(info.firstname === "");
    seterr1(info.lastname === "");
    seterr2(info.mail === "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.mail)) && seterr2("")
    seterr3(info.pass === "");
  } else {
    seterr(false);
    seterr1(false);
    seterr2(false);
    seterr3(false);
    createUserWithEmailAndPassword(auth, info.mail, info.pass)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
};

  return (
    <div>
        <div className='h-[641px] bg-[#101828]  grid items-center justify-center'>
            <h1 className='text-[white] mt-[-30px] font-[600] text-[30px]  ml-[40px] relative rotate-[0.2deg]'>Sign up or Create  Account</h1>
            <div className='mt-[-50px] h-[500px] rounded-[10px] w-[450px] bg-[#fffafa15] blur-[px] border-[1px] border-[#444242]'>
                <p className='text-[14px] font-[600] mt-[25px] absolute ml-[30px] text-[#e9e9e9]'>First Name</p>
                <input onChange={handelfirstname} className=' outline-none text-[white] font-[600] ml-[30px] mt-[50px] py-[7px] rounded-[5px] w-[160px] bg-[#ffffff1e] placeholder:font-[700] text-[13px] px-[10px]' style={{color : err? "red" : "white" , border: "1px solid" , borderColor: err? "red" : "transparent" }} type="text" placeholder='First name '  />
                {err && (<span className=' absolute text-[12px] text-[red] ml-[-155px] mt-[88px]'>
            First name required*
          </span>
        )}
        <p className='text-[14px] font-[600] mt-[-60px] ml-[240px] absolute text-[#e9e9e9]'>Last Name</p>
        <input onChange={handellastname} className=' outline-none  font-[600] absolute mt-[50px] ml-[50px] py-[7px] rounded-[5px] w-[160px] bg-[#ffffff1e] placeholder:font-[700] text-[13px] px-[10px] text-[white]'style={{color : err1? "red" : "white" , border: "1px solid" , borderColor: err1? "red" : "transparent" }}  type="text" placeholder='Last name' />
        {err1 && (<span  className=' absolute text-[12px] text-[red] ml-[55px] mt-[88px]'>
            Last name required*
          </span>
        )}
        <p className='text-[14px] font-[600] mt-[25px] ml-[30px] absolute text-[#e9e9e9]'>Email Adress</p>
        <input onChange={handelemail} className=' outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[135px] ml-[-160px] text-[13px] 'style={{color : err2? "red" : "white" , border: "1px solid" , borderColor: err2? "red" : "transparent" }} type="text" placeholder='name@gmail.com' />
        {err2 && (<span  className=' absolute text-[12px] text-[red] ml-[-155px] mt-[175px]'>
        Enter a valid mail*
          </span>
        )}
        <p className='text-[14px] font-[600] mt-[115px] ml-[30px] absolute text-[#e9e9e9]'>Password</p>
        <input onChange={handelpass} className=' outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[230px] ml-[-160px] text-[13px] 'style={{color : err3? "red" : "white" , border: "1px solid" , borderColor: err3? "red" : "transparent" }} type={type ? "text" : "password"}  placeholder='Password'/>
        {err3 && (<span className=' absolute text-[12px] text-[red] ml-[-155px] mt-[270px]'>
            Password required*
          </span>
        )}
        <i onClick={() => settype(!type)} className="fa-solid fa-eye absolute mt-[157px] ml-[360px]" style={{display : type ? "block" : "none"}}></i>
        <i onClick={() => settype(!type)} className="fa-solid fa-eye-slash absolute mt-[157px] ml-[360px]"  style={{display : type ? "none" : "block"}}></i>
        <input className='bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] p-[10px] mt-[297px] ml-[-335px] text-[13px] h-[15px] ' type="checkbox" />
        <p className='text-[14px] font-[600] mt-[210px] ml-[60px] absolute text-[#e9e9e9]'>Remember Password</p>
        <a className='text-[12px] font-[600] mt-[294px] ml-[80px] absolute text-[#00c3ff] hover:underline' href="">Alredy have an Acount?</a>
        <button onClick={handlesignup} className='py-[10px] rounded-[5px] text-[14px] font-[600] mt-[350px] ml-[-160px] absolute text-[#e9e9e9] bg-[#00a2ff] px-[160px]'>Sign up</button>
        <button className='py-[10px] rounded-[5px] text-[14px] font-[600] mt-[345px] ml-[30px] absolute text-[#e9e9e9] bg-[#ffffff1e] px-[55px] flex items-center gap-[10px] cursor-pointer'><img className='h-[20px] ml-[-15px]' src="icon.png" alt="" /> Google</button>
        <button className='py-[8px] rounded-[5px] text-[14px] font-[600] mt-[345px] ml-[220px] absolute text-[#e9e9e9] bg-[#ffffff1e] px-[55px] flex items-center gap-[10px] cursor-pointer'><img className='h-[25px] ml-[-15px]' src="icon2.png" alt="" /> Git Hub</button>
    </div>
        </div>
    </div>
  )
}
export default Signup