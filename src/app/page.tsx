import AddCategoryPg from "@/pages/add-category";
import CategoryPg from "@/pages/category-pg";
import MainSideBar from "@/pages/main-side-bar";
import { Main } from "next/document";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <CategoryPg/>
      {/* <AddCategoryPg/> */}
    </div>
  );
}
