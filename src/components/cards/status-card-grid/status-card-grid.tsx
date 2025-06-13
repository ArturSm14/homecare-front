import { Card, CardContent } from "@/components/ui/card";
import type { StatusCardGridProps } from "./types";
import { StatusCard } from "../status-card/status-card";

export function StatusCardGrid({
  data,
  isLoading,
}: StatusCardGridProps) {
  const total = data?.response
    ? data.response.pending +
      data.response.in_progress +
      data.response.completed +
      data.response.cancelled
    : 0;

  const statusConfig = [
    {
      key: "pending" as const,
      title: "Pendentes",
      variant: "pending" as const,
      count: data?.response?.pending || 0,
    },
    {
      key: "in_progress" as const,
      title: "Em Andamento",
      variant: "in_progress" as const,
      count: data?.response?.in_progress || 0,
    },
    {
      key: "completed" as const,
      title: "Concluídos",
      variant: "completed" as const,
      count: data?.response?.completed || 0,
    },
    {
      key: "cancelled" as const,
      title: "Cancelados",
      variant: "cancelled" as const,
      count: data?.response?.cancelled || 0,
    },
    {
      key: "all" as const,
      title: "Total",
      variant: "all" as const,
      count: total,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="mt-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statusConfig.map((status) => (
        <StatusCard
          key={status.key}
          title={status.title}
          count={status.count}
          variant={status.variant}
        />
      ))}
    </div>
  );
}
