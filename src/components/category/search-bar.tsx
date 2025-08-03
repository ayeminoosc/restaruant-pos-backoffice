
"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useMenuStore } from "@/store/useMenuStore";

export default function SearchBar() {

      const searchTerm = useMenuStore((state) => state.searchTerm);
  const setSearchTerm = useMenuStore((state) => state.setSearchTerm);
    return(

          <div className="max-w-[720px] min-w-[539px] h-[56px] bg-[#f6f6f6] px-4 rounded-[10px] relative">
        <Search className="absolute text-[#a2a2a2] size-[22px] top-4" />
        <Input
          className="h-full border-none focus-visible:ring-0 focus:outline-none text-[#a2a2a2] !text-[17px] font-normal leading-6 placeholder:text-[#a2a2a2] pl-7"
          placeholder="Search"
          value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    )
}