import { DatePickerWithRange } from "@/components/organism/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/shadcn/select";
import React from "react";
import CardDashboard from "@/components/templates/card-dashboard";
import { ChartDashboard } from "@/components/templates/chart-dashboard";

export default function page() {
  return (
    <div className="bg-background">
      <div className="flex flex-row justify-between w-full">
        <DatePickerWithRange />
        <Select>
          <SelectTrigger className="w-[180px] bg-white shadow-sm font-semibold">
            <SelectValue placeholder="Daily" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-10">
        <CardDashboard title="Total Students" amount={513} percentage={8.5} />
        <CardDashboard
          title="Total Certified Students"
          amount={489}
          percentage={8.5}
        />
        <CardDashboard
          title="Average Certification Score"
          amount={84.62}
          percentage={8.5}
        />
      </div>
      <div className="mt-10">
        <ChartDashboard />
      </div>
    </div>
  );
}
