import { AddTodoDialog } from "@/components/add-todo-dialog";
import { NotificationBadge } from "@/components/notification-badge";

interface HeaderProps {
  upcomingCount: number;
}

export function Header({ upcomingCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">To-Do</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your tasks
        </p>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBadge count={upcomingCount} />
        <AddTodoDialog />
      </div>
    </header>
  );
}
