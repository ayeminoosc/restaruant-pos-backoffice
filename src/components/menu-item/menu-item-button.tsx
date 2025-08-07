import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ReactNode } from "react";

type MenuItemButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  disabled?: boolean;
};

const MenuItemButton = ({
  children,
  href,
  type = "button",
  onClick,
  className,
  variant = "default",
  disabled = false,
}: MenuItemButtonProps) => {
  if (href) {
    return (
      <Button
        asChild
        variant={variant}
        className={className}
        disabled={disabled}
      >
        <Link href={href} className="flex items-center gap-2">
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      className={className}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default MenuItemButton; 