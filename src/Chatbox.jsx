import React, { useEffect, useState } from "react";
import Chatlist from "./Chatlist";
import { useSelector } from "react-redux";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import moment from "moment";
import Sidebar from "./Sidebar";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { TbXboxX } from "react-icons/tb";

const Chatbox = () => {
  const messageuser = useSelector((state) => state.activeUser.value);
  const user = useSelector((state) => state.user.value);
  let [hover, lethover] = useState(null);
  let [hover2, lethover2] = useState(false);
  const db = getDatabase();
  let [message, setmessage] = useState("");
  let [showmssage, setshowmessage] = useState([]);
  let [unsend, setunsend] = useState(false);
  let [showprofileinfo, setshowprofileinfo] = useState(false);

  let handlesendmessage = () => {
    // console.log(message);
    const messageRef = push(ref(db, "messages"));
    set(messageRef, {
      sendername: user.displayName,
      senderemail: user.email,
      senderid: user.uid,
      acceptorname: messageuser.name,
      acceptormail: messageuser?.email || "demo@gmail.com",
      acceptorid: messageuser.id,
      textcontent: message,
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
    }).then(() => {
      setmessage("");
    });
  };
  let handeltextcontent = (e) => {
    setmessage(e.target.value);
  };
  useEffect(() => {
    const userRef = ref(db, "messages");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        const msg = item.val();
        if (
          (msg.senderid === user.uid && msg.acceptorid === messageuser.id) ||
          (msg.senderid === messageuser.id && msg.acceptorid === user.uid)
        ) {
          arr.push({ ...msg, id: item.key });
        }
      });
      setshowmessage(arr);
    });
  }, [db, user.uid, messageuser.id]);
  let handlehover = () => {
    lethover("block");
  };
  let handlebubble = (item) => {
    // console.log(item.id)
    showmssage.map((key) => {
      if (item.id == key.id) {
        // console.log(key.id)
        lethover(hover === item.id ? null : item.id);
      }
    });
  };
  let handlebubble2 = () => {
    lethover2(!hover2);
  };
  let handleunsend = (item) => {
    // console.log(item.id)
    // console.log(showmssage);
    let unsendtext = "";
    showmssage.forEach((key) => {
      if (item.id === key.id) {
        // console.log(item.id)
        if (item.senderid === user.uid) {
          unsendtext = "⊘ 𝘛𝘩𝘪𝘴 𝘮𝘦𝘴𝘴𝘢𝘨𝘦 𝘸𝘢𝘴 𝘥𝘦𝘭𝘦𝘵𝘦𝘥";
        } else {
          unsendtext = "⊘ User 𝘶𝘯𝘴𝘦𝘯𝘥 𝘵𝘩𝘪𝘴 𝘮𝘦𝘴𝘴𝘢𝘨𝘦";
        }
        update(ref(db, "messages/" + item.id), { textcontent: unsendtext })
          // remove(ref(db, "messages/" + item.id))
          .then(() => {
            lethover(null);
            alert("Message Unsend");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  let handlemessageuserifo = () => {
    setshowprofileinfo(true);
  };
  return (
    <div>
      <>
        <div
          style={{
            display: showprofileinfo ? "block" : "none",
            // right: showprofileinfo ? "0px" : "-400px",
            transition : "2s"
          }}
          className=" h-full w-[400px] bg-[#ffffff6e] absolute right-0 z-50 backdrop-blur-2xl transition-all"
        >
          <div
            onClick={() => setshowprofileinfo(!showprofileinfo)}
            className=" mt-[10px] ml-[10px]"
          >
            <TbXboxX size={30} />
          </div>
          <div className=" gap-2 bg-[] grid justify-center ">
            <div className=" flex justify-center ">
              <div className="h-[100px] w-[100px] bg-[black] rounded-full overflow-hidden">
                <img
                  src={`${
                    messageuser?.photourl ||
                    "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  }`}
                  alt=""
                />
              </div>
            </div>
            <p className=" font-[600] text-[20px] text-center">
              {messageuser.name}
            </p>
            <p className=" text-center text-[#383737]">{messageuser.email}</p>
          </div>
          <div className=" flex justify-center mt-[15px]">
            <p className=" flex items-center gap-1 font-[600] text-[13px]">
              <FaLock /> End to end encryption
            </p>
          </div>
          <div className=" flex justify-center mt-[40px]">
            <div className=" flex gap-[40px]">
              <button className=" grid gap-1">
                <FaUserCircle size={25} />
                <span className=" font-[500] text-[12px] ml-[-3px] ">
                  Profile
                </span>
              </button>
              <button className=" grid gap-1">
                <IoMdNotifications size={25} />
                <span className=" font-[500] text-[12px] ml-[px]">Mute</span>
              </button>
              <button className=" grid gap-1">
                <FaMagnifyingGlass size={25} />
                <span className=" font-[500] text-[12px] ml-[-3px]">
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* component */}
        <div className="flex h-screen overflow-hidden">
          <Chatlist />
          {/* Main Chat Area */}
          <div className="flex-1">
            {/* Chat Header */}
            <header className="bg-[#d8d9da] p-4 text-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden mr-[10px]">
                  <img
                    src={`${
                      messageuser?.photourl ||
                      "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    }`}
                    alt=""
                  />
                </div>
                <h1 className="text-[20px] font-semibold">
                  {messageuser.name}
                </h1>
              </div>
              <div className=" flex w-[150px] justify-between">
                <div className=" cursor-pointer h-[40px] w-[40px] bg-[#cfcccc] text-[25px] flex items-center justify-center rounded-[5px]">
                  <IoMdCall />
                </div>
                <div className=" cursor-pointer h-[40px] w-[40px] bg-[#cfcccc] text-[25px] flex items-center justify-center rounded-[5px]">
                  <FaVideo />
                </div>
                <div
                  onClick={handlemessageuserifo}
                  className="cursor-pointer h-[40px] w-[40px] bg-[] text-[25px] flex items-center justify-center"
                >
                  <FaInfoCircle />
                </div>
              </div>
            </header>
            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36 bg-gray-600 [scrollbar-width:none]">
              {/* Incoming Message */}
              {showmssage.map((item, i) =>
                item.senderid === user.uid ? (
                  <div className="flex justify-end mb-4">
                    <div className="relative message-bubble flex flex-col max-w-[300px] bg-[#05253b] text-white rounded-[5px] p-2">
                      <p className="break-words">{item.textcontent}</p>
                      <div className=" h-[50px] w-[40px]  absolute flex ml-[-45px] mt-[-8px]">
                        <span
                          onClick={() => handlebubble(item)}
                          className=" h-[30px] w-[30px] bg-[#c7c7bb] rounded-[60px] flex justify-center "
                        >
                          <i className="fa-solid fa-ellipsis-vertical mt-[7px] cursor-pointer text-[black]"></i>
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-200 self-end mt-1">
                        {moment(item.time, "YYYY-MM-DD HH:mm:ss").format(
                          "h:mm A"
                        )}
                      </span>
                      <span
                        style={{
                          display: hover === item.id ? "block" : "none",
                        }}
                        className=" h-[136px] w-[150px] bg-gray-800 absolute ml-[-200px] rounded-[5%] overflow-hidden mt-[-70px] z-50"
                      >
                        <ul className=" grid gap-[px]">
                          <li
                            onClick={() => handleunsend(item)}
                            className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer"
                          >
                            Unsend
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Remove for me
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Edit
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Report
                          </li>
                        </ul>
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                      <img
                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="My Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex mb-4 ">
                    <div className=" w-9 h-9 rounded-full flex items-center justify-center mr-2">
                      <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div className=" message-bubble2 flex flex-col max-w-[300px] bg-gray-400 rounded-lg p-2">
                      <p className="text-gray-700 break-words">
                        {item.textcontent}
                      </p>
                      {/* <div className=" h-[40px] w-[50px]  absolute flex ml-[40px] mt-[-8px] bg-[]">
                        <span
                          onClick={handlebubble2}
                          className=" h-[30px] w-[30px] bg-[#a19f9f] rounded-[60px] flex justify-center ml-[10px] "
                        >
                          <i class="fa-solid fa-ellipsis-vertical mt-[7px] cursor-pointer"></i>
                        </span>
                      </div> */}
                      <span className="text-[9px] text-[#1b1a1a] self-end mt-1">
                        {moment(item.time, "YYYY-MM-DD HH:mm:ss").format(
                          "h:mm A"
                        )}
                      </span>
                      {/* <span
                        style={{
                          display: hover2 ? "block" : "none",
                        }}
                        className=" h-[136px] w-[150px] bg-gray-800 absolute ml-[100px] rounded-[5%] overflow-hidden"
                      >
                        <ul className=" grid gap-[px]">
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Unsend
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Remove for me
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Edit
                          </li>
                          <li className=" hover:bg-[#ffffff54] py-[5px] text-center font-[600] cursor-pointer">
                            Report
                          </li>
                        </ul>
                      </span> */}
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Chat Input */}
            <footer className="bg-gray-600 border-t border-[#1f1e1e38] p-4 absolute bottom-0 w-3/4 ">
              <div className="flex items-center ">
                <input
                  value={message || ""}
                  onChange={handeltextcontent}
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-[#1f1e1e38] focus:outline-none focus:bg-[#ffffff4d] text-[#ffffff] font-[600]"
                />

                <button
                  onClick={handlesendmessage}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Send
                </button>
              </div>
            </footer>
          </div>
        </div>
      </>
    </div>
  );
};

export default Chatbox;
