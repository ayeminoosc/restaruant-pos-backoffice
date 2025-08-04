import React from 'react'

import { ArrowLeft } from 'lucide-react';

interface NavigationProps {
  title: string;
  back: ()=> void;
}

export const Navigation: React.FC<NavigationProps> = ({ title, back }) => {
  return (
   <div className="relative flex justify-center items-center border-b-2 h-20 mb-2  ">
        <ArrowLeft size={37} onClick={back} className='absolute left-4 w-[50px]' />
        <span className='text-[32px] font-[600]'>{title}</span>
    </div>
  )
}
