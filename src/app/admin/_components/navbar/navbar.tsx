"use client";

import Image from "next/image";
import { ComponentProps, ReactNode, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "@/recoil/atoms";

export type NavbarProps = {
  props?: any;
  rightAccessory?: ReactNode;
} & ComponentProps<"nav">;

export const Navbar = ({
  rightAccessory,
  ...props
}: NavbarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useRecoilState(sideBarOpenState);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800"
      {...props}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <FaBars />
            </button>
            <a href="/admin" className="flex ml-2 md:mr-24">
              <Image
                src="/logo.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="Logo"
                style={{
                  width: "45%",
                  maxWidth: "324px",
                  maxHeight: "83px",
                }}
              />
            </a>
          </div>
          <div className="flex items-center">{rightAccessory}</div>
        </div>
      </div>
    </nav>
  );
};
