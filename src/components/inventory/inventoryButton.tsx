import React from 'react'

type InventoryButtonProps = {
    action: ()=>void;
    title: string;
    className?:string;
}

const InventoryButton = ({action,title,className}: InventoryButtonProps) => {
  return (
  
        <button onClick={()=>action()} className={`text-[20px] border-[#FF6E30] rounded-[4px] border-1 p-2.5 ${className}`}>
            {title}
        </button>
   
  )
}

export default InventoryButton