"use client";

import { ComponentProps } from "react";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "@/recoil/atoms";
import { cn } from "@/helpers/cn";

export type SidebarProps = {
  props?: any;
} & ComponentProps<"aside">;

export const Sidebar = ({ children, ...props }: SidebarProps): JSX.Element => {
  const [isOpen] = useRecoilState(sideBarOpenState);

  const navbarOpenClass = isOpen ? "translate-x-0" : "-translate-x-full";
  return (
    <aside
      className={cn(
        navbarOpenClass,
        "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200"
      )}
      aria-label="Sidebar"
      {...props}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">{children}</ul>
      </div>
    </aside>
  );
};
