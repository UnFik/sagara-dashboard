import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/shadcn/card";
import { Icons } from "../molecules/shadcn/icons";

interface CardDashboardProps {
  title: string;
  amount: number;
  percentage: number;
  icon?: React.ReactNode;
}
export default function CardDashboard({
  title,
  amount,
  percentage,
  icon,
}: CardDashboardProps) {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <div className="text-md text-muted-foreground mt-3">
          <span className="text-green-500 flex flex-row">
            <Icons.increase className="w-4 h-4 text-green-500 mr-2 my-auto" />
            {percentage}%{" "}
            <span className="text-black">&nbsp;Up from yesterday</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
