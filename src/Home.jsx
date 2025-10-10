import React from 'react'
import { useDispatch } from 'react-redux'
import { userInfo } from './Slices/userSlice';



const Home = () => {
  let dispatch = useDispatch();
  let handeldatasend = () =>{
    dispatch(userInfo({name : "name"}));
  };

  return (
    <div>
      <div className='h-[600px] bg-[#cfcfcf]'>
        <div className='h-[250px] bg-[#a1a1a1]'>
          <div className='h-[45px] w-[200px] bg-[white] rounded-[10px] absolute right-15 mt-[180px] text-[14px] font-[700] flex items-center justify-center'><i className="fa-solid fa-camera mr-[5px] text-[20px]"></i> Edit Profile Picture</div>
        </div>
        <div className=' border-2 border-[#e7e7e7] h-[200px] w-[200px] bg-[#adadad] rounded-[100px] absolute mt-[-70px] ml-[20px]'>
          <div className='flex items-center justify-center h-[45px] w-[45px] rounded-[50px] bg-[#ffffff] absolute mt-[140px] ml-[140px]'>
            <i class="fa-solid fa-camera text-[25px]"></i>
          </div>
          <img className='mt-[0px] rounded-[250px]' src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg" alt="" />
        </div>
        <h1 className=' absolute text-[30px] font-[700] ml-[230px] mt-[25px]'>Shahriear Al Amin</h1>
        <p className=' absolute text-[14px] font-[300] ml-[230px] mt-[70px] tracking-[1px]'>0 Friends</p>
        <button className=' absolute py-[10px] px-[20px] bg-[#0077ff] rounded-[10px] text-[white] font-bold text-[13px] ml-[850px] mt-[55px]'><i class="fa-solid fa-plus mr-[5px]"></i>Add to Story</button>
        <button  className=' absolute py-[10px] px-[20px] bg-[#f5f2f2] rounded-[10px] text-[#000000] font-bold text-[13px] ml-[1020px] mt-[53px]'> <i class="fa-solid fa-pen mr-[5px]"></i>Edit Profile</button>
      </div>
    </div>
  )
}

export default Home