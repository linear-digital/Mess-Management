"use client";
import { useRouter } from "next/navigation";
import React from "react";

const StatisticCard = ({
  title,
  value,
  desc,
  sing,
  link,
}: {
  title: string;
  value: any;
  desc: string;
  sing?: boolean;
  link?: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };
  return (
    <div onClick={handleClick} className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-xs">{desc}</p>
        <h5 className="text-2xl font-semibold">
          {value}
          {sing && " ৳"}
        </h5>
      </div>
    </div>
  );
};

export default StatisticCard;
