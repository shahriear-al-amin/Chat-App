import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";

const Home = () => {
  const [active, setActive] = useState("home");
  const user = useSelector((state) => state.user.value);

  const handleClick = (tab) => {
    setActive(tab);
  };

  const users = [
    { name: "Jones Willum", imgurl: "user1.jpg" },
    { name: "Garrett Mahoney", imgurl: "user2.jpeg" },
    { name: "Harlee Velez", imgurl: "user3.jpeg" },
    { name: "Dayton Garrett", imgurl: "user4.jpeg" },
    { name: "Dexter Collier", imgurl: "user5.jpeg" },
  ];

  const friendrequest = [
    { name: "Jones Willum", imgurl: "friend1.jpeg" },
    { name: "Garrett Mahoney", imgurl: "friend2.jpeg" },
    { name: "Harlee Velez", imgurl: "friend3.jpeg" },
    { name: "Dayton Garrett", imgurl: "friend4.jpeg" },
    { name: "Dexter Collier", imgurl: "friend5.jpeg" },
  ];
  const post = [
    { name: "Jhon doe", imgurl: "friend3.jpeg" , postimg : "https://media.istockphoto.com/id/183263571/photo/laptop-and-a-cup-of-coffee-on-office-desk.jpg?s=612x612&w=0&k=20&c=Jr2HD0wcreNr0eO1A_N_usvRa-VlagV6cZypn2D0V3o=" },
    { name: "Charlie Velez", imgurl: "user2.jpeg" , postimg : "https://media.istockphoto.com/id/2147591244/photo/thoughtful-businesswoman-taking-a-break-and-drinking-a-cup-of-coffee.jpg?s=612x612&w=0&k=20&c=d0Qfn3sf3H-bxbwuZTvHBdwJMpf12NXcqBfIKzpa6kk=" },
    { name: "James Velez", imgurl: "friend4.jpeg" , postimg : "https://images.pexels.com/photos/28494302/pexels-photo-28494302/free-photo-of-cozy-workspace-with-laptop-and-coffee-mug.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
  ]

  return (
    <div className="min-h-screen bg-[#e4e4e4]">
      <div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2
        flex justify-around items-center
        w-[260px] h-[65px]
        bg-[#000000] backdrop-blur-md
        border border-white/20 shadow-lg
        rounded-2xl
        text-[#cccccc] z-50"
      >
        <button
          onClick={() => handleClick("home")}
          className={`transition-all duration-300 ${
            active === "home"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <FaHome size={26} />
        </button>

        <button
          onClick={() => handleClick("chat")}
          className={`transition-all duration-300 ${
            active === "chat"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <IoChatboxSharp size={26} />
        </button>

        <button
          onClick={() => handleClick("user")}
          className={`transition-all duration-300 ${
            active === "user"
              ? "scale-125 text-white drop-shadow-[0_0_10px_rgba(255,192,203,0.8)]"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          <FaUserAlt size={24} />
        </button>
      </div>

      <div className="h-[600px] w-[400px] bg-[#f1f1f1] fixed left-0 rounded-tr-[15px] rounded-br-[15px] shadow-md">
        <p className="text-center font-[700] text-[22px] py-[10px] text-[#333] border-b border-[#ccc]">
          Users List
        </p>

        <div className="overflow-y-auto h-[540px] px-[10px]">
          {users.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-[#fff] rounded-[10px] p-[8px] my-[10px] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="h-[45px] w-[45px] rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={item.imgurl}
                  alt={item.name}
                />
              </div>

              <p className="font-[600] ml-[10px] flex-1 text-[#333]">
                {item.name}
              </p>

              <div className="flex gap-[6px]">
                <button className="px-[12px] py-[6px] bg-[#007bff] hover:bg-[#005ecb] transition-all text-white text-[12px] font-[600] rounded-[6px]">
                  Add Friend
                </button>
                <button className="px-[12px] py-[6px] bg-[#8b8b8b] hover:bg-[#16a34a] transition-all text-white text-[12px] font-[600] rounded-[6px]">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

<div className="h-[600px] w-[570px] bg-[#ffffff] fixed mt-[50px] left-1/2 transform -translate-x-1/2 rounded-[15px] shadow-md flex flex-col overflow-hidden z-[40]">

  {/* Header */}
  <div className="h-[60px] border-b border-[#ddd] flex items-center justify-center bg-[#fafafa]">
    <h2 className="text-[20px] font-[700] text-[#333]">News Feed</h2>
  </div>

  {/* Create Post Box */}
  <div className="p-[15px] border-b border-[#ddd] bg-[#f9f9f9] flex items-center gap-[10px]">
    <div className="h-[45px] w-[45px] rounded-full overflow-hidden">
      <img src="user1.jpg" alt="user" className="h-full w-full object-cover" />
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
            <p className="font-[600] text-[#333] text-[14px]">{item.name}</p>
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
          <button className="text-[#007bff] font-[600] hover:underline">👍 Like</button>
          <button className="text-[#007bff] font-[600] hover:underline">💬 Comment</button>
          <button className="text-[#007bff] font-[600] hover:underline">🔁 Share</button>
        </div>
      </div>
    ))}
  </div>
</div>



      <div className="h-[600px] w-[400px] bg-[#f1f1f1] mt-[0px] fixed right-0 rounded-tl-[15px] rounded-bl-[15px] shadow-md">
        <p className="text-center font-[700] text-[22px] py-[10px] text-[#333] border-b border-[#ccc]">
          Friend Requests
        </p>

        <div className="overflow-y-auto h-[540px] px-[10px]">
          {friendrequest.map((req, i) => (
            <div
              key={i}
              className="flex items-center bg-[#fff] rounded-[10px] p-[8px] my-[10px] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="h-[45px] w-[45px] rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={req.imgurl}
                  alt={req.name}
                />
              </div>

              <p className="font-[600] ml-[10px] flex-1 text-[#333]">
                {req.name}
              </p>

              <div className="flex gap-[6px]">
                <button className="px-[10px] py-[6px] bg-[#42b925] hover:bg-[#16a34a] transition-all text-white text-[12px] font-[600] rounded-[6px]">
                  Confirm
                </button>
                <button className="px-[10px] py-[6px] bg-[#929090] hover:bg-[#706e6e] transition-all text-white text-[12px] font-[600] rounded-[6px]">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
