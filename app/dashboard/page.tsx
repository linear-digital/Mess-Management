"use client";

import React from "react";
import StatisticCard from "./_UI/DashBoard/StatisticCard";
import MealStatistics from "./_UI/DashBoard/MealStatistics";
import RecentExpencess from "./_UI/DashBoard/RecentExpenses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = () => {
  const { data } = useQuery({
    queryKey: ["all-members"],
    queryFn: async () => {
      const res = await axios.get("/api/user");
      return res.data;
    },
  });
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
        <StatisticCard
          title="Total Users"
          desc="Total number of users in this Mess"
          value={data?.length}
        />
        <StatisticCard
          title="Total Meals"
          desc="Total number of meals this Month"
          value={0}
        />
        <StatisticCard
          title="Total Payments"
          desc="Total payment received this Month"
          value={0}
          sing
        />
        <StatisticCard
          desc="Total expenses on This Month"
          title="Total Expenses"
          value={0}
          sing
        />
      </div>
      <div className="grid lg:grid-cols-2 mt-10 gap-5">
        <MealStatistics />
        <RecentExpencess />
      </div>
    </div>
  );
};

export default page;
