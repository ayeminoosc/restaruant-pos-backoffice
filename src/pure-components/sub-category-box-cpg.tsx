import { PencilSimpleLine,Trash} from "phosphor-react";
import type { SubCategoryType } from "@/store/app-data";

export default function SubCategoryBoxOfCPg({ id, name, bilingualName, image, isActive }: SubCategoryType) {
    return (
        <div className="categoryBox  flex justify-between pl-[7.2rem] p-[1rem] border-t border-gray-300 ">

            <div className="left-side flex items-center gap-[0.875rem]">
                <img
                    src="/assets/menu13.jpg"
                    alt="Menu 15"
                    className="w-[2.125rem] h-[2.125rem] rounded-[0.625rem] object-cover"
                />
                <div className="categoryTitle font-inter font-medium text-[1.25rem] flex gap-x-[0.5rem]">
                    <div>{name}</div>
                    <div className="text-[#979797]">(8 Items)</div>
                </div>
            </div>

            <div className="flex items-center gap-[1rem]">
                <PencilSimpleLine className="w-[1.6rem] h-[1.6rem]" />
                <Trash className="w-[1.6rem] h-[1.6rem]" color="#EA1414" />
            </div>

        </div>
    );
}
