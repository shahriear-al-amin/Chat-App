import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";
import { auth } from "./firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import Friendlist from "./Friendlist";
import Userlist from "./Userlist";

const Home = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  const [active, setActive] = useState("home");
  const user = useSelector((state) => state.user.value);
  const [viewprofile, setviewprofile] = useState(false);
  const handleClick = (tab) => {
    setActive(tab);
  };
  useEffect(() => {
    console.log(auth.currentUser);
  }, [auth.currentUser]);

  let handlecross = () => {
    setviewprofile(false);
  };
  let handleshow = () => {
    setviewprofile(true);
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

  const post = [
    {
      name: "Jhon doe",
      imgurl: "friend3.jpeg",
      postimg:
        "https://media.istockphoto.com/id/183263571/photo/laptop-and-a-cup-of-coffee-on-office-desk.jpg?s=612x612&w=0&k=20&c=Jr2HD0wcreNr0eO1A_N_usvRa-VlagV6cZypn2D0V3o=",
    },
    {
      name: "Charlie Velez",
      imgurl: "user2.jpeg",
      postimg:
        "https://media.istockphoto.com/id/2147591244/photo/thoughtful-businesswoman-taking-a-break-and-drinking-a-cup-of-coffee.jpg?s=612x612&w=0&k=20&c=d0Qfn3sf3H-bxbwuZTvHBdwJMpf12NXcqBfIKzpa6kk=",
    },
    {
      name: "James Velez",
      imgurl: "friend4.jpeg",
      postimg:
        "https://images.pexels.com/photos/28494302/pexels-photo-28494302/free-photo-of-cozy-workspace-with-laptop-and-coffee-mug.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e4e4e4]">
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
          <IoChatboxSharp size={26} />
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

      <div className="h-[600px] w-[570px] bg-[#ffffff] fixed mt-[50px] left-1/2 transform -translate-x-1/2 rounded-[15px] shadow-md flex flex-col overflow-hidden z-[40]">
        {/* Header */}
        <div className="h-[60px] border-b border-[#ddd] flex items-center justify-center bg-[#fafafa]">
          <h2 className="text-[20px] font-[700] text-[#333]">News Feed</h2>
        </div>

        {/* Create Post Box */}
        <div className="p-[15px] border-b border-[#ddd] bg-[#f9f9f9] flex items-center gap-[10px]">
          <div className="h-[45px] w-[45px] rounded-full overflow-hidden">
            <img
              src="user1.jpg"
              alt="user"
              className="h-full w-full object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-[#f1f1f1] rounded-[20px] px-[15px] py-[8px] outline-none text-[14px]"
          />
          <button className="bg-[#007bff] hover:bg-[#005ecb] text-white px-[15px] py-[7px] rounded-[20px] text-[13px] font-[600] transition-all">
            Post
          </button>
        </div>

        {/* Posts List */}
        <div className="flex-1 overflow-y-auto p-[15px]">
          {post.map((item, i) => (
            <div
              key={i}
              className="bg-[#fff] rounded-[12px] shadow-sm p-[12px] mb-[15px] border border-[#eee] hover:shadow-md transition-all duration-200"
            >
              {/* Post Header */}
              <div className="flex items-center mb-[10px]">
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                  <img
                    src={item.imgurl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-[10px]">
                  <p className="font-[600] text-[#333] text-[14px]">
                    {item.name}
                  </p>
                  <p className="text-[#777] text-[12px]">2 hrs ago</p>
                </div>
              </div>

              {/* Post Caption */}
              <p className="text-[#444] text-[14px] mb-[10px] leading-[20px]">
                Just enjoying a great day with some coffee ☕ and code 💻
              </p>

              {/* Post Image */}
              <div className="rounded-[10px] overflow-hidden mb-[10px]">
                <img
                  src={item.postimg}
                  alt="post"
                  className="w-full h-[250px] object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="flex justify-between px-[10px] mt-[5px] text-[13px]">
                <button className="text-[#007bff] font-[600] hover:underline">
                  👍 Like
                </button>
                <button className="text-[#007bff] font-[600] hover:underline">
                  💬 Comment
                </button>
                <button className="text-[#007bff] font-[600] hover:underline">
                  🔁 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Userlist/>
      <Friendlist/>
    </div>
  );
};

export default Home;
