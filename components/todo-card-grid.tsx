"use client";

import { TodoCard } from "@/components/todo-card";
import type { Todo } from "@/lib/db/schema";

interface TodoCardGridProps {
  todos: Todo[];
}

export function TodoCardGrid({ todos }: TodoCardGridProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-lg">No todos yet</p>
        <p className="text-muted-foreground text-sm mt-2">
          Create your first todo to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
