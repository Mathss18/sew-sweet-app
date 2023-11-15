"use client";

import { useRouter } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export type SidebarItemProps = {
  props?: any;
  title: string;
  link?: string;
  icon?: ReactNode;
  onClick?: () => void;
  rightAccessory?: ReactNode;
} & ComponentProps<"li">;

export const SidebarItem = ({
  link,
  icon,
  title,
  onClick,
  rightAccessory,
  ...props
}: SidebarItemProps): JSX.Element => {
  const router = useRouter();
  return (
    <li {...props} onClick={onClick}>
      <a
        onClick={() => {
          if (link) {
            router.push(link);
          }
        }}
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
      >
        {icon}
        <span className="flex-1 ml-3">{title}</span>
        {rightAccessory}
      </a>
    </li>
  );
};
