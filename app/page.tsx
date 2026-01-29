import { getTodos, getUpcomingCount } from "@/lib/actions/todos";
import { TodoCardGrid } from "@/components/todo-card-grid";
import { Header } from "@/components/header";
import { NotificationProvider } from "@/components/notification-provider";

export default async function Home() {
  const [todos, upcomingCount] = await Promise.all([
    getTodos(),
    getUpcomingCount(),
  ]);

  return (
    <NotificationProvider upcomingCount={upcomingCount}>
      <main className="min-h-screen p-4 md:p-8 lg:p-16 max-w-7xl mx-auto">
        <Header upcomingCount={upcomingCount} />
        <TodoCardGrid todos={todos} />
      </main>
    </NotificationProvider>
  );
}
