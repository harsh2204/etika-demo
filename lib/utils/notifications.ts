const NOTIFICATION_STORAGE_KEY = "todo-notifications-sent";

interface SentNotification {
  todoId: number;
  type: "1day" | "15min" | "1min";
  timestamp: number;
}

export function getSentNotifications(): SentNotification[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function markNotificationSent(todoId: number, type: "1day" | "15min" | "1min") {
  if (typeof window === "undefined") return;
  try {
    const sent = getSentNotifications();
    const newNotification: SentNotification = {
      todoId,
      type,
      timestamp: Date.now(),
    };
    sent.push(newNotification);
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(sent));
  } catch (error) {
    console.error("Failed to save notification:", error);
  }
}

export function hasNotificationBeenSent(todoId: number, type: "1day" | "15min" | "1min"): boolean {
  const sent = getSentNotifications();
  return sent.some(
    (n) => n.todoId === todoId && n.type === type
  );
}

export function cleanupOldNotifications() {
  if (typeof window === "undefined") return;
  try {
    const sent = getSentNotifications();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const filtered = sent.filter((n) => n.timestamp > oneWeekAgo);
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to cleanup notifications:", error);
  }
}
