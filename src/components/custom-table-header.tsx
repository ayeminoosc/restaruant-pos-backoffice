import { ReactNode } from "react";

const CustomTableHeader = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex justify-between items-end h-14 mb-6">
      <div className="font-semibold text-2xl "></div>
      {children}
    </div>
  );
};

export default CustomTableHeader;
