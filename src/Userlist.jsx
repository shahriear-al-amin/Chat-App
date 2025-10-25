import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const user = useSelector((state) => state.user.value);
  let [req, setReq] = useState({}); // ✅ object for userwise request tracking
  let [userlist, setuserlist] = useState([]);
  const db = getDatabase();
  let [requestid,setrequestid] = useState([])

  useEffect(() => {
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (user.uid !== item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setuserlist(arr);
    });
  }, [user.uid]);

  let handlesendfriendrequest = (item) => {
    set(ref(db, 'friendlist/' + (user.uid + item.id)), {
      sendername: user.displayName,
      senderemail: user.email,
      senderid: user.uid,
      recivername: item.name,
      reciveremail: item.email,
      reciverid: item.id,
    }).then(() => {
      alert("Friend request sent successfully ✅");
      //  only mark this user's request as sent
      setReq((prev) => ({ ...prev, [item.id]: true }));
    });
  };


    useEffect(() => {
    const userRef = ref(db, 'friendlist');
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    let arr = []
    snapshot.forEach((item) =>{
    arr.push(item.val().senderid + item.val().reciverid)
    setrequestid(arr)
    })
  });
    }, [])
  // ✅ optional: check previously sent requests
  // useEffect(() => {
  //   const userRef = ref(db, 'friendlist');
  //   onValue(userRef, (snapshot) => {
  //     let sentReqs = {};
  //     snapshot.forEach((item) => {
  //       if (item.val().senderid === user.uid) {
  //         sentReqs[item.val().reciverid] = true;
  //       }
  //     });
  //     setReq(sentReqs);
  //   });
  // }, [user.uid]);

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
                src="https://cdn.dribbble.com/userupload/21906368/file/original-41b7840090f97b5446c2a327e9fc8b31.png?resize=400x300"
                alt="#"
              />
            </div>

            <p className="font-[600] ml-[10px] flex-1 text-[#333]">
              {item.name}
            </p>

            <div className="flex gap-[6px]">
              {/* {req[item.id] ? (
                <button
                  className="px-[12px] py-[6px] bg-[#d1cece] text-[#000000] text-[12px] font-[600] rounded-[6px]"
                  disabled
                >
                  Requested
                </button>
              ) : (
                <button
                  onClick={() => handlesendfriendrequest(item)}
                  className="px-[12px] py-[6px] bg-[#007bff] hover:bg-[#005ecb] transition-all text-white text-[12px] font-[600] rounded-[6px]"
                >
                  Add Friend
                </button>
              )} */}


              {
                requestid.includes(user.uid + item.id) ||
                requestid.includes(item.id + user.uid)?
                <button
                  className="px-[12px] py-[6px] bg-[#d1cece] text-[#000000] text-[12px] font-[600] rounded-[6px]"
                  disabled
                >
                  Requested
                </button> :
                <button
                  onClick={() => handlesendfriendrequest(item)}
                  className="px-[12px] py-[6px] bg-[#007bff] hover:bg-[#005ecb] transition-all text-white text-[12px] font-[600] rounded-[6px]"
                >
                  Add Friend
                </button>

              }

              <button className="px-[12px] py-[6px] bg-[#8b8b8b] hover:bg-[#16a34a] transition-all text-white text-[12px] font-[600] rounded-[6px]">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
