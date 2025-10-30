import React, { useEffect, useState } from "react";
import Chatlist from "./Chatlist";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const Chatbox = () => {
  const messageuser = useSelector((state) => state.activeUser.value);
  const user = useSelector((state) => state.user.value);
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
      acceptormail: messageuser?.email||"demo@gmail.com",
      acceptorid: messageuser.id,
      textcontent: message,
    }).then(() => {
      setmessage("")
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
            <div className="h-screen overflow-y-auto p-4 pb-36">
              {/* Incoming Message */}
              {showmssage.map((item) =>
                item.senderid == user.uid ? (
                  <div className="flex justify-end mb-4 cursor-pointer">
                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                      <p>{item.textcontent}</p>
                      <p className=" absolute text-[black] mt-[40px] text-[11px] ml-[-100px]">Just a secend ago</p>
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
                  <div className="flex mb-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                      <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                      <p className="text-gray-700">{item.textcontent}</p>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              <div className="flex items-center">
                <input
                  value={message || ""}
                  onChange={handeltextcontent}
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
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
