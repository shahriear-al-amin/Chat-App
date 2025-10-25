import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Friendrequestlist = () => {
  const user = useSelector((state) => state.user.value);
  let [friendrquest , setfriendrquest] = useState([])
    const db = getDatabase();
      const friendrequest = [
    { name: "Jones Willum", imgurl: "friend1.jpeg" },
    { name: "Garrett Mahoney", imgurl: "friend2.jpeg" },
    { name: "Harlee Velez", imgurl: "friend3.jpeg" },
    { name: "Dayton Garrett", imgurl: "friend4.jpeg" },
    { name: "Dexter Collier", imgurl: "friend5.jpeg" },
  ];
    useEffect(() => {
    const userRef = ref(db, 'friendlist');
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    let arr = []
    snapshot.forEach((item) =>{
      if(user.uid != item.val().senderid && user.uid === item.val().reciverid){
    arr.push(item.val())
      }
  //   console.log(item.val().reciverid)
  //   console.log(user.uid)
  // //   console.log(item.key)
  // //   console.log(user.uid)
  // // console.log(user)
  // // console.log(item.val().senderid)
    })
    setfriendrquest(arr)
  });
    }, [])
    console.log(friendrquest)
  return (
          <div className="h-[600px] w-[400px] bg-[#f1f1f1] mt-[0px] fixed right-0 rounded-tl-[15px] rounded-bl-[15px] shadow-md">
        <p className="text-center font-[700] text-[22px] py-[10px] text-[#333] border-b border-[#ccc]">
          Friend Requests
        </p>

        <div className="overflow-y-auto h-[540px] px-[10px]">
          {friendrquest.map((req, i) => (
            <div
              key={i}
              className="flex items-center bg-[#fff] rounded-[10px] p-[8px] my-[10px] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="h-[45px] w-[45px] rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src=""
                />
              </div>

              <p className="font-[600] ml-[10px] flex-1 text-[#333]">
                {req.sendername}
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
  )
}

export default Friendrequestlist