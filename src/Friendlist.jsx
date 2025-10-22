import React from 'react'

const Friendlist = () => {
      const friendrequest = [
    { name: "Jones Willum", imgurl: "friend1.jpeg" },
    { name: "Garrett Mahoney", imgurl: "friend2.jpeg" },
    { name: "Harlee Velez", imgurl: "friend3.jpeg" },
    { name: "Dayton Garrett", imgurl: "friend4.jpeg" },
    { name: "Dexter Collier", imgurl: "friend5.jpeg" },
  ];
  return (
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
  )
}

export default Friendlist