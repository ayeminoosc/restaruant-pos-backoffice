"use client";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import ColorBox from "./color-box";

export default function AdvancedSettingBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div
        className="w-full flex justify-between items-center mt-3 cursor-pointer  border-b-[1px] border-[#9C9C9C] pb-[1rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-inter font-medium text-[1.25rem] leading-[1.5rem] tracking-[0.03125rem]">
          Advanced Settings
        </div>
        {isOpen ? (
          <ChevronDown className="w-[1.5rem] h-[1.5rem]" />
        ) : (
          <ChevronRight className="w-[1.5rem] h-[1.5rem]" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 w-full">
          <div className="font-inter font-medium text-[1.25rem] leading-[1.5rem] tracking-[0.03125rem] pb-2 pt-4">
            Select Button Color
          </div>
          <div className="w-full mt-2 flex justify-start gap-2">
            <ColorBox color="#FF6E30"/>
            <ColorBox color="#30FF6E"/>
            <ColorBox color="#6E30FF"/>
            <ColorBox color="#FF30A1"/>
            <ColorBox color="#A130FF"/>
             <ColorBox color="#FF6E30"/>
            <ColorBox color="#30FF6E"/>
            <ColorBox color="#6E30FF"/>
            <ColorBox color="#FF30A1"/>
            <ColorBox color="#A130FF"/>
             <ColorBox color="#FF6E30"/>
            <ColorBox color="#30FF6E"/>
            <ColorBox color="#6E30FF"/>
            <ColorBox color="#FF30A1"/>
            <ColorBox color="#A130FF"/>
             <ColorBox color="#FF6E30"/>
            <ColorBox color="#30FF6E"/>
            <ColorBox color="#6E30FF"/>
            <ColorBox color="#FF30A1"/>
            <ColorBox color="#A130FF"/>
          </div>
        </div>
      )}
    </div>
  );
}
