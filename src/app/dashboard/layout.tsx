"use client";

import MainSideBar from "@/components/main-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-[281px] border-r-[1px] border-gray-100 ">
        <MainSideBar />
      </div>

      <div className="flex-1 flex-col ">
        {/* <div className="h-[123px]">
          <MainHeader />
        </div> */}
        <div>{children}</div>
      </div>
    </div>
  );
}
