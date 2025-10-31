import React, { useEffect, useState } from "react";
import Chatlist from "./Chatlist";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";

const Chatbox = () => {
  const messageuser = useSelector((state) => state.activeUser.value);
  const user = useSelector((state) => state.user.value);
  let [hover, lethover] = useState(false);
  let [hover2, lethover2] = useState(false);
  const db = getDatabase();
  let [message, setmessage] = useState("");
  let [showmssage, setshowmessage] = useState([]);
  let handlesendmessage = () => {
    console.log(message);
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
          arr.push(msg);
        }
      });
      setshowmessage(arr);
    });
  }, [db, user.uid, messageuser.id]);
  let handlehover = () => {
    lethover("block");
  };
  let handlebubble = (item) => {
    lethover(!hover);
    console.log(showmssage)
  };
  let handlebubble2 = () => {
    lethover2(!hover2);
  };
  // console.log(showmssage);
  return (
    <div>
      <>
        {/* component */}
        <div className="flex h-screen overflow-hidden">
          <Chatlist />
          {/* Main Chat Area */}
          <div className="flex-1">
            {/* Chat Header */}
            <header className="bg-[#d8d9da] p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">{messageuser.name}</h1>
            </header>
            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36 bg-gray-600">
              {/* Incoming Message */}
              {showmssage.map((item) =>
                item.senderid === user.uid ? (
                  <div className="flex justify-end mb-4">
                    <div className="message-bubble flex flex-col max-w-[300px] bg-gray-500 text-white rounded-[5px] p-2">
                      <p className="break-words">{item.textcontent}</p>
                      <div className=" h-[50px] w-[40px]  absolute flex ml-[-45px] mt-[-8px]">
                        <span
                          onClick={() => handlebubble(item)}
                          className=" h-[30px] w-[30px] bg-[#c7c7bb] rounded-[60px] flex justify-center "
                        >
                          <i class="fa-solid fa-ellipsis-vertical mt-[7px] cursor-pointer text-[black]"></i>
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-200 self-end mt-1">
                        {moment(item.time, "YYYY-MM-DD HH:mm:ss").format(
                          "h:mm A"
                        )}
                      </span>
                      <span
                        style={{
                          display: hover ? "block" : "none",
                        }}
                        className=" h-[136px] w-[150px] bg-gray-800 absolute ml-[-200px] rounded-[5%] overflow-hidden"
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
