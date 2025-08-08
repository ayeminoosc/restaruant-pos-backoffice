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
  className="rounded-sm bg-[#FFF2DE] py-[3px] px-1 flex items-center justify-center"
  style={{ width, height: width }}
>
  <img
    alt="icon"
    src={icon}
    className="cursor-pointer w-[26px] h-[28px]"
  />
          </div>
        <div className='flex flex-col gap-[6px]'>
            <p className='text-[16px] text-[#3D3D3D] font-medium'>{title}</p>
            <p className='text-2xl font-semibold'>{count}</p>
        </div>
    </div>
    <div className='flex items-center justify-between'>
         <p className='text-[#14AF19] font-medium text-[16px]'>{stateThisweek}</p>
         <div className='text-[#646464] font-medium text-[16px] flex gap-1'>
          <img
    alt="icon"
    src="/assets/Eye.svg"
    className="cursor-pointer w-[26px] h-[28px]"
  />
          <a
  href="#"
  className="text-[#646464] underline hover:text-blue-800 cursor-pointer"
>
  View details
</a>
</div>
    </div>
   

    </div>
  )
}

export default InventoryCard