import React, { useState } from 'react'

const Signup = () => {
    let [info , setinfo] = useState({
        firstname : "",
        lastname : "",
        mail : "",
        pass : ""
    })
    let [type , settype] = useState(false)
    let [err , seterr] = useState(false)
    let handelfirstname = (e) =>{
        setinfo((prev) =>({
            ...prev,
            firstname : e.target.value
        }));
    }
    let handellastname = (e) =>{
        setinfo((prev) =>({
            ...prev,
            lastname : e.target.value
        }));
    }
    let handelemail = (e) =>{
        setinfo((prev) =>({
            ...prev,
            mail : e.target.value
        }));
    }
    let handelpass = (e) =>{
        setinfo((prev) =>({
            ...prev,
            pass : e.target.value
        }));
    }
    let handlesignup = () =>{
        if( info.firstname === ""){
        seterr(!err)
        }
    }
  return (
    <div>
        <div className='h-[641px] bg-[#101828]  grid items-center justify-center'>
            <h1 className='text-[white] mt-[-30px] font-[600] text-[30px]  ml-[40px] relative rotate-[0.2deg]'>Sign up or Create  Account</h1>
            <div className='mt-[-50px] h-[500px] rounded-[10px] w-[450px] bg-[#fffafa15] blur-[px] border-[1px] border-[#444242]'>
                <p className='text-[14px] font-[600] mt-[25px] absolute ml-[30px] text-[#e9e9e9]'>First Name</p>
                <input onChange={handelfirstname} className=' outline-none text-[white] font-[600] ml-[30px] mt-[50px] py-[7px] rounded-[5px] w-[160px] bg-[#ffffff1e] placeholder:font-[700] text-[13px] px-[10px]' style={{color : err? "red" : "white" , border: "1px solid" , borderColor: err? "red" : "transparent" }} type="text" placeholder='First name '  />
         {err && (
          <span
            style={{
              position: "absolute",
              left: "300px",
              top: "185px",
              color: "red",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            First name required*
          </span>
        )}
        <p className='text-[14px] font-[600] mt-[-60px] ml-[240px] absolute text-[#e9e9e9]'>Last Name</p>
        <input onChange={handellastname} className=' outline-none  font-[600] absolute mt-[50px] ml-[50px] py-[7px] rounded-[5px] w-[160px] bg-[#ffffff1e] placeholder:font-[700] text-[13px] px-[10px] text-[white]'  type="text" placeholder='Last name' />
        <p className='text-[14px] font-[600] mt-[30px] ml-[30px] absolute text-[#e9e9e9]'>Email Adress</p>
        <input onChange={handelemail} className=' outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[145px] ml-[-160px] text-[13px] ' type="text" placeholder='name@gmail.com' />
        <p className='text-[14px] font-[600] mt-[115px] ml-[30px] absolute text-[#e9e9e9]'>Password</p>
        <input onChange={handelpass} className=' outline-none text-[white] font-[600] bg-[#ffffff1e] absolute w-[370px] rounded-[5px] py-[8px] placeholder:font-[700] px-[10px] mt-[230px] ml-[-160px] text-[13px] ' type={type ? "text" : "password"}  placeholder='Password'/>
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