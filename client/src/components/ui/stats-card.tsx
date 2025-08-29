import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  iconBg: string;
}

export default function StatsCard({ title, value, description, icon, iconBg }: StatsCardProps) {
  return (
    <Card className="stat-card hover-lift cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
