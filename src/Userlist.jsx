import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const user = useSelector((state) => state.user.value);
    let [userlist,setuserlist] = useState([])
    const db = getDatabase();
  const users = [
    { name: "Jones Willum", imgurl: "user1.jpg" },
    { name: "Garrett Mahoney", imgurl: "user2.jpeg" },
    { name: "Harlee Velez", imgurl: "user3.jpeg" },
    { name: "Dayton Garrett", imgurl: "user4.jpeg" },
    { name: "Dexter Collier", imgurl: "user5.jpeg" },
  ];
  useEffect(() => {
  const userRef = ref(db, 'users');
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  let arr = []
  snapshot.forEach((item) =>{
    if( user.uid != item.key){
    arr.push(item.val())
    }
//   console.log(item.key)
//   console.log(user.uid)
  })
  setuserlist(arr)
});
  }, [])
  console.log(userlist)

  return (
          <div className="h-[600px] w-[400px] bg-[#f1f1f1] fixed left-0 rounded-tr-[15px] rounded-br-[15px] shadow-md">
        <p className="text-center font-[700] text-[22px] py-[10px] text-[#333] border-b border-[#ccc]">
          Users List
        </p>

        <div className="overflow-y-auto h-[540px] px-[10px]">
          {userlist.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-[#fff] rounded-[10px] p-[8px] my-[10px] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="h-[45px] w-[45px] rounded-full overflow-hidden bg-[#d3d1d1]">
                <img
                  className="h-full w-full object-cover"
                  src={"https://cdn.dribbble.com/userupload/21906368/file/original-41b7840090f97b5446c2a327e9fc8b31.png?resize=400x300"}
                  alt={"#"}
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
  )
}

export default Userlist