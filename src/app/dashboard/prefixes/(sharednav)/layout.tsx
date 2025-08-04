"use client"; 

import { ReactNode } from "react";
import {Navigation} from "@/components/prefixes/sharedNav";
import { useRouter } from "next/navigation";
export default function EditLayout({ children }: { children: ReactNode }) {
const router = useRouter()
    const handleback = () => {
     router.push("/dashboard/prefixes");
  }
  return (
    <div>
      <Navigation title="Add prefix" back={handleback} />
      <main>{children}</main>
    </div>
  );
}
