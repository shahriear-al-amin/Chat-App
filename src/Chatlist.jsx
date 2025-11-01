import { Database, getDatabase, onValue, ref } from 'firebase/database';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './Slices/Selecteduserslise';

const Chatlist = () => {
  let dispatch = useDispatch()
    let [chatlist,setchatlist]= useState([])
    const user = useSelector((state) => state.user.value);
  const db = getDatabase();

  
    useEffect(() => {
    const userRef = ref(db, 'confirmedfriendlist');
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    let arr = []
    snapshot.forEach((item) =>{
    if(item.val().acceptorid === user.uid || item.val().senderid === user.uid){
    arr.push(item.val())
    }
    setchatlist(arr)
    // console.log(arr)
    })
  });
    }, [])


// component.js
let handleactive = (chatinfo) => {
  // console.log(chatinfo)
  // console.log(user)
  if(user.uid == chatinfo.senderid){
  dispatch(selectedUser({name : chatinfo.acceptorname, email : chatinfo.acceptormail , id : chatinfo.acceptorid}));
  } else{
  dispatch(selectedUser({name : chatinfo.sendername, email : chatinfo.sendermail , id : chatinfo.senderid}));
  }
};
    const messageuser = useSelector((state) => state.activeUser.value);
    // console.log(messageuser)

// console.log(chatlist)

  return (
    <div>
            <div className="w-[300px] bg-gray-600 border-r border-[#1f1e1e38]">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-[#1f1e1e38] flex justify-between items-center bg-[#6e7c7c] text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {/* Menu Dropdown */}
          <div
            id="menuDropdown"
            className="absolute right-0 mt-2 w-48 bg-white border border-[#1f1e1e38] rounded-md shadow-lg hidden"
          >
            <ul className="py-2 px-3">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 2
                </a>
              </li>
              {/* Add more menu options here */}
            </ul>
          </div>
        </div>
      </header>
      {/* Contact List */}
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
{
  chatlist.map((chat, i) => {
    return (
      <div key={i} className={` flex items-center mb-4 cursor-pointer p-2 rounded-md ${ chat.senderid == messageuser.id || chat.acceptorid == messageuser.id ? "bg-[#8080803b]":"bg-gray-600"}`}>
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div onClick={() =>handleactive(chat)} className="flex-1 ">
          <h2 className="  text-[white] font-[600]">{chat.sendername === user.displayName ? chat.acceptorname : chat.sendername}</h2>
          <p className="text-gray-400">Click to chat</p>
        </div>
      </div>
    );
  })
}

      </div>
    </div>
    </div>
  )
}

export default Chatlist