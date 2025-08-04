"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewModifierGroupTitle = () => {
  const router = useRouter();

  return (
    <div className="h-[115px] p-10 font-semibold text-center border-b-2">
      <div className="flex items-center ">
        <ArrowLeft className="size-12" onClick={() => router.back()} />
        <div className="flex-1">
          <span className="text-[32px]">Add new modifier group</span>
        </div>
      </div>
    </div>
  );
};

export default NewModifierGroupTitle;
