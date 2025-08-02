import TitleBar from "@/pure-components/title-bar";
import { Pencil, Trash, ArrowLeft } from "lucide-react";
import ImageBox from "@/pure-components/image-box";
import MainInputBox from "@/pure-components/main-input-box";
import OptionalInputBox from "@/pure-components/optional-input-box";
import AdvancedSettingBox from "@/pure-components/advanced-setting-box-acp";
import ActiveBtn from "@/pure-components/active-btn";
import SaveCancelBtn from "@/pure-components/save-cancle-btn";
import { useRouter } from 'next/router'
import DropdownBox from "@/pure-components/drop-down-box";
import {appData} from "@/store/app-data";

export default function AddSubCategoryPg() {
    const categoryList = appData.categoryList;
    let categoryNameList = categoryList.map((category) => (
         category.name
    ));

    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="w-full h-screen">
            <div className="h-[10%]">
                <TitleBar label="Add New SubCategory" onClick={handleBack} />
            </div>

            <div className="h-[90%] w-full flex flex-col px-[15%] pt-[4%] gap-[3.2rem] pb-[4%]">

                <div className="self-center">
                    <ImageBox />
                </div>

                <div className="w-full h-[9%]">
                    <DropdownBox label="Choose Category" placeHolder="Select a category" categoryNameList={categoryNameList} />
                </div>

                <div className="w-full h-[9%]">
                    <MainInputBox label="SubCategory Name" placeHolder="Enter SubCategory Name..." />
                </div>

                <div className="w-full h-[9%]">
                    <OptionalInputBox label="Bilingual Name" placeHolder="Enter Bilingual Name..." />
                </div>

                <div className="w-full ">
                    <AdvancedSettingBox />
                </div>

                <div className="w-full ">
                    <ActiveBtn />
                </div>

                <div className="w-full ">
                    <SaveCancelBtn />
                </div>
            </div>
        </div>
    );
}