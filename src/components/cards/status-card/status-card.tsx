import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatusCardProps } from "./types";
import { Activity, AlertCircle, ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { iconVariants } from "@/utils/const/variants/iconVariants";
import { statusVariants } from "@/utils/const/variants/statusVariants";
import { bgVariants } from "@/utils/const/variants/bgVariants";

export function StatusCard({
  title,
  count,
  variant,
  percentChange,
}: StatusCardProps) {
  const getIcon = () => {
    switch (variant) {
      case "pending":
        return <Clock className={cn(iconVariants({ variant }))} />;
      case "in_progress":
        return <Activity className={cn(iconVariants({ variant }))} />;
      case "completed":
        return <CheckCircle2 className={cn(iconVariants({ variant }))} />;
      case "cancelled":
        return <XCircle className={cn(iconVariants({ variant }))} />;
      default:
        return <AlertCircle className={cn(iconVariants({ variant }))} />;
    }
  };
  return (
    <Card
      className={cn(
        "border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden h-40",
        statusVariants({ variant })
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={cn(bgVariants({ variant }))}>{getIcon()}</div>
          {percentChange !== undefined && (
            <div
              className={cn(
                "text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full",
                percentChange >= 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {percentChange >= 0 ? "+" : ""}
              {percentChange}%
              <ArrowUpRight
                className={cn(
                  "h-3 w-3",
                  percentChange < 0 && "transform rotate-90"
                )}
              />
            </div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{count}</p>
        </div>
      </CardContent>
    </Card>
  );
}
