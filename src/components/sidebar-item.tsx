export interface SideBarItemsType {
  label: string;
  svg: string;
  url: string;
  subItems?: { label: string; url: string }[];
}

export default function SideBarItem({ label, svg, subItems }: SideBarItemsType) {
  return (
    <div className="w-full px-6 flex justify-between items-center ">
      <div className="flex items-center gap-[1.6875rem]">
        <img src={svg} alt={label} className="size-6" />
        <div className="font-inter font-medium text-base leading-[100%] tracking-[0%]">
          {label}
        </div>
      </div>
      {subItems && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );
}
