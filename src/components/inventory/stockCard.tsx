import React from 'react'

interface ItemProps {
  name: string
  status: string
  level: string
  remaining: string
}

export const StockCard = ({ name, status, level, remaining }: ItemProps) => {
  return (
 
    <div className={`max-w-[1025px] flex flex-col h-[132px] border-b-2 last:border-b-0 ${status === "Warning"
                ? "bg-[#FFFBF5]"
                : "bg-[#FFEEEE]" }`}>
    <div className=" pl-4  flex items-start my-auto">
      {/* Icon */}
      <div className="mr-2 mt-1">
        <img
          alt="icon"
          src="/assets/WarningCircle.svg"
          className="cursor-pointer w-[24px] h-[24px]"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <p className="font-semibold text-[20px]">{name}</p>
          <div
            className={`text-center px-2.5 rounded-[10px] text-[16px] font-medium ${
              status === "Warning"
                ? "bg-[#FFDFBA] text-[#F54A00]"
                : "bg-[#FFBABA] text-[#E7000B]"
            }`}
          >
            {status}
          </div>
        </div>

        {/* Second line: level + remaining */}
        <div className="flex items-center gap-4 text-[16px] text-base">
          <p className="font-medium">{level}</p>
          <div className="flex items-center gap-1 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D3D3D] inline-block"></span>
            <p className="text-[#3D3D3D] ml-2">{remaining} remaining</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
