export interface SideBarItemsType {
  label: string;
  svg: string;
  url: string;
}

export default function SideBarItem({ label, svg }: SideBarItemsType) {
  return (
    <div className="w-full px-6 flex justify-between items-center ">
      <div className="flex items-center gap-[1.6875rem]">
        <img src={svg} alt={label} className="size-6" />
        <div className="font-inter font-medium text-base leading-[100%] tracking-[0%]">
          {label}
        </div>
      </div>
    </div>
  );
}
