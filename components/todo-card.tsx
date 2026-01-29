"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toggleTodo, deleteTodo } from "@/lib/actions/todos";
import { startTransition } from "react";
import type { Todo } from "@/lib/db/schema";

interface TodoCardProps {
  todo: Todo;
}

function formatDueDate(dueDate: Date | null): string {
  if (!dueDate) return "";
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffMs < 0) return "Overdue";
  if (diffHours < 1) return "Due soon";
  if (diffHours < 24) return `Due in ${diffHours}h`;
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays}d`;
}

function isUrgent(dueDate: Date | null): boolean {
  if (!dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  return diffMs >= 0 && diffHours < 24;
}

export function TodoCard({ todo }: TodoCardProps) {
  const handleToggle = () => {
    startTransition(() => {
      toggleTodo(todo.id);
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      deleteTodo(todo.id);
    });
  };

  const urgent = isUrgent(todo.dueDate);
  const dueDateText = formatDueDate(todo.dueDate);

  return (
    <Card
      className={`animate-fade-in-up transition-all hover:shadow-md hover:-translate-y-1 ${
        urgent ? "border-primary border-2" : ""
      } ${todo.completed ? "opacity-60" : ""}`}
      style={{ animationDelay: `${todo.id * 50}ms` }}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className="mt-1"
          />
          <div className="flex-1">
            <h3
              className={`text-base font-medium ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-8 w-8 shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      {todo.dueDate && (
        <CardContent className="pt-0">
          <Badge
            variant={urgent ? "default" : "outline"}
            className={urgent ? "bg-primary text-primary-foreground" : ""}
          >
            {dueDateText}
          </Badge>
        </CardContent>
      )}
    </Card>
  );
}
