"use client";

import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge
      variant="default"
      className="bg-primary text-primary-foreground flex items-center gap-1.5 animate-pulse"
    >
      <Bell className="h-3 w-3" />
      {count} {count === 1 ? "task" : "tasks"} due soon
    </Badge>
  );
}
