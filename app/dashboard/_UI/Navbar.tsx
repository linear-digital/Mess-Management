import Link from "next/link";
import React from "react";
import Manus from "./Manus";
import { auth } from "@/util/firebase/firebase.init";
import { useRouter } from "next/navigation";

const Navbar = () => {
  return (
    <div className="bg-base-100 border-b">
      <div className="navbar  container mx-auto">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <Link href={"/dashboard"} className="btn btn-ghost text-xl font-bold">
            Site Logo
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <Manus />
            </ul>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const ProfileDropdown = () => {
  const router = useRouter();
  const logOut = () => {
      auth.signOut();
      router.push("/");
    };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base"
      >
        <li>
          <Link href={"/dashboard/mills"} className="justify-between">
            My Mills
          </Link>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li >
          <button onClick={logOut}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
