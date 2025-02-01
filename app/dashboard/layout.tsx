"use client";

import React from "react";
import Manus from "./_UI/Manus";
import Navbar from "./_UI/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-white bg-base-300">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <Navbar />
            {/* Page content here */}
            <section className=" text-white">{children}</section>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <Manus />
            </ul>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default layout;
