import React from 'react'

interface cardProps {
    icon:string;
    title:string;
    count: number;
    stateThisweek: string;
    width?: string;
}

const InventoryCard = ({icon,title,count,stateThisweek, width='56px'}: cardProps) => {
  return (
    <div className='border-[#D9D9D9] border-1 w-1/3 h-[150px] px-6 m-2 flex flex-col justify-center gap-4'>
    <div className='border-b-[#D9D9D9] border-b-[1px] flex gap-[10px] pb-4 '>
       <div
  className="rounded-[100px] bg-[#FFF2DE] py-[3px] px-1 flex items-center justify-center"
  style={{ width, height: width }}
>
  <img
    alt="icon"
    src={icon}
    className="cursor-pointer w-[26px] h-[28px]"
  />
          </div>
        <div className='flex flex-col gap-[8px]'>
            <p className='text-[16px] text-[#3D3D3D] font-medium'>{title}</p>
            <p className='text-2xl font-semibold'>{count}</p>
        </div>
    </div>
    <div className='flex items-center'>
         <p className='text-[#14AF19] font-medium text-[16px]'>{stateThisweek}</p>
    </div>
   

    </div>
  )
}

export default InventoryCard