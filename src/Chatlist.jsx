import { Database, getDatabase, onValue, ref } from "firebase/database";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "./Slices/Selecteduserslise";
import { TiThMenuOutline } from "react-icons/ti";


const Chatlist = () => {
  let dispatch = useDispatch();
  let [chatlist, setchatlist] = useState([]);
  const user = useSelector((state) => state.user.value);
  const db = getDatabase();
  let [sidebar,setsidebar] = useState(false);

  useEffect(() => {
    const userRef = ref(db, "confirmedfriendlist");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().acceptorid === user.uid ||
          item.val().senderid === user.uid
        ) {
          arr.push(item.val());
        }
        setchatlist(arr);
        // console.log(arr)
      });
    });
  }, []);

  // component.js
  let handleactive = (chatinfo) => {
    // console.log(chatinfo)
    // console.log(user)
    if (user.uid == chatinfo.senderid) {
      dispatch(
        selectedUser({
          name: chatinfo.acceptorname,
          email: chatinfo.acceptormail,
          id: chatinfo.acceptorid,
        })
      );
    } else {
      dispatch(
        selectedUser({
          name: chatinfo.sendername,
          email: chatinfo.sendermail,
          id: chatinfo.senderid,
        })
      );
    }
  };
  const messageuser = useSelector((state) => state.activeUser.value);
  // console.log(messageuser)

  // console.log(chatlist)
  let handlesidebar = () => {
    setsidebar(!sidebar)
  };
  return (
    <div>
      <div className="w-[300px] bg-gray-600 border-r border-[#1f1e1e38]">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-[#1f1e1e38] flex justify-between items-center bg-[#6e7c7c] text-white">
          <h1 className="text-2xl font-semibold">Chats...</h1>
          <div className="relative">
            <button id="menuButton" className="focus:outline-none">
              <TiThMenuOutline
                className="text-[30px] cursor-pointer"
                onClick={handlesidebar}
              />
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
          {chatlist.map((chat, i) => {
            return (
              <div
                key={i}
                className={` flex items-center mb-4 cursor-pointer p-2 rounded-md ${
                  chat.senderid == messageuser.id ||
                  chat.acceptorid == messageuser.id
                    ? "bg-[#8080803b]"
                    : "bg-gray-600"
                }`}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div onClick={() => handleactive(chat)} className="flex-1 ">
                  <h2 className="  text-[white] font-[600]">
                    {chat.sendername === user.displayName
                      ? chat.acceptorname
                      : chat.sendername}
                  </h2>
                  <p className="text-gray-400">Click to chat</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
      style={{
        left : sidebar? "0px" : "-300px"
      }}
      
      className="w-[230px] absolute bg-[#00000073] h-full backdrop-blur-2xl top-0 transition-all ">
        <div className="ml-[10px] mt-[20px] flex items-center gap-2 h-[40px] w-[full] bottom-0 ">
          <div className=" h-[40px] w-[40px] rounded-full bg-[red] overflow-hidden">
            <img src={`${user?.photourl||"https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/518275347_710773948484742_3993082592097358562_n.jpg?stp=c0.512.1536.1536a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=b5Ecq-UnLzwQ7kNvwH6kTEO&_nc_oc=Admn_rsM7zaskBkDNigwr5o9R3XZ4RQpoCPIu-PIiEEZimbDEuYrdtt2VVeHL4D1J4s&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=1_TcRhb2vsRjWfzy5Q3blA&oh=00_Afjmnn2po7cJQj0TnSGSTi5qtdnF15pcfjS0im1oAsXjvg&oe=690D7EEC"}`} alt="" />
          </div>
            <p className=" text-[white]">{user.displayName}</p>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
};

export default Chatlist;
