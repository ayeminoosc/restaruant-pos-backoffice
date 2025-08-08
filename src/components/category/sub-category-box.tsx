import { PencilSimpleLine,Trash} from "phosphor-react";
import type { SubCategory } from "@/store/category-store";
interface SubCategoryProps extends SubCategory{
    handleEdit: () => void;
    handleDelete: () => void;   
}

export default function SubCategoryBoxOfCPg({ id, name, bilingualName, imageUrl, active, handleEdit, handleDelete }: SubCategoryProps) {

    return (
        <div className="categoryBox  flex justify-between pl-[7.2rem] p-[1rem] border-t border-gray-300 bg-[#F5F5F5]">

            <div className="left-side flex items-center gap-[0.875rem]">
                <img
                    src={imageUrl}
                    alt="Menu 15"
                    className="w-[2.125rem] h-[2.125rem] rounded-[0.625rem] object-cover"
                />
                <div className="categoryTitle font-inter font-medium text-[1.25rem] flex gap-x-[0.5rem]">
                    <div>{name}</div>
                    <div className="text-[#979797]">(8 Items)</div>
                </div>
            </div>

            <div className="flex items-center gap-[1rem]">
                <PencilSimpleLine className="w-[1.6rem] h-[1.6rem]" onClick={handleEdit}/>
                <Trash className="w-[1.6rem] h-[1.6rem]" color="#EA1414" onClick={handleDelete}/>
            </div>

        </div>
    );
}
