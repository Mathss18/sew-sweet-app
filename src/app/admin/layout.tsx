"use client";

import { FaHouse, FaUser } from "react-icons/fa6";
import { Navbar, Sidebar, SidebarItem } from "./_components";
import { Badge } from "@/components";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar>
        <SidebarItem
          title="Dashboard"
          icon={<FaHouse />}
          link="/admin"
          rightAccessory={<Badge title="New" color="blue" />}
        />
        <SidebarItem title="Users" icon={<FaUser />} link="/admin/users" />
      </Sidebar>
      <div className="p-4 sm:ml-64 mt-14">{children}</div>
    </>
  );
}
