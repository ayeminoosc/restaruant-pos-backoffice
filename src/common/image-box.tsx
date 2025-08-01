import { Camera } from "lucide-react";

export default function ImageBox() {
    return (
        <div className="w-full h-full  flex flex-col items-center justify-center  ">
            <Camera className="w-[2.6rem] h-[2.6rem] text-gray-400 mb-2" />
            <div className="text-[0.875rem] font-normal font-inter text-center">
                Add Photo
            </div>

        </div>
    );
}
