"use client";

import { useEffect, useRef } from "react";
import {
  getTodosDueIn1Day,
  getTodosDueIn15Min,
  getTodosDueIn1Min,
} from "@/lib/actions/todos";
import {
  markNotificationSent,
  hasNotificationBeenSent,
  cleanupOldNotifications,
} from "@/lib/utils/notifications";

interface NotificationProviderProps {
  children: React.ReactNode;
  upcomingCount: number;
}

export function NotificationProvider({
  children,
  upcomingCount,
}: NotificationProviderProps) {
  const permissionRequestedRef = useRef(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    const requestPermission = async () => {
      if (Notification.permission === "default" && !permissionRequestedRef.current) {
        permissionRequestedRef.current = true;
        await Notification.requestPermission();
      }
    };

    requestPermission();
    cleanupOldNotifications();

    const showNotification = async (
      title: string,
      body: string,
      tag: string
    ) => {
      if (Notification.permission !== "granted") return;

      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification(title, {
            body,
            tag,
            icon: "/icon-192x192.png",
            badge: "/icon-192x192.png",
            requireInteraction: false,
            silent: false,
          });
        } else {
          new Notification(title, {
            body,
            tag,
            icon: "/icon-192x192.png",
          });
        }
      } catch (error) {
        console.error("Failed to show notification:", error);
      }
    };

    const check1DayNotifications = async () => {
      const todos = await getTodosDueIn1Day();
      for (const todo of todos) {
        if (!hasNotificationBeenSent(todo.id, "1day")) {
          await showNotification(
            `Todo due in 1 day: ${todo.title}`,
            todo.description || "Don't forget to complete this task!",
            `todo-1day-${todo.id}`
          );
          markNotificationSent(todo.id, "1day");
        }
      }
    };

    const check15MinNotifications = async () => {
      const todos = await getTodosDueIn15Min();
      for (const todo of todos) {
        if (!hasNotificationBeenSent(todo.id, "15min")) {
          await showNotification(
            `Todo due in 15 minutes: ${todo.title}`,
            todo.description || "This task is due soon!",
            `todo-15min-${todo.id}`
          );
          markNotificationSent(todo.id, "15min");
        }
      }
    };

    const check1MinNotifications = async () => {
      const todos = await getTodosDueIn1Min();
      for (const todo of todos) {
        if (!hasNotificationBeenSent(todo.id, "1min")) {
          await showNotification(
            `Todo due in 1 minute: ${todo.title}`,
            todo.description || "This task is due now!",
            `todo-1min-${todo.id}`
          );
          markNotificationSent(todo.id, "1min");
        }
      }
    };

    intervalsRef.current = [
      setInterval(check1DayNotifications, 60 * 60 * 1000),
      setInterval(check15MinNotifications, 5 * 60 * 1000),
      setInterval(check1MinNotifications, 60 * 1000),
    ];

    check1DayNotifications();
    check15MinNotifications();
    check1MinNotifications();

    return () => {
      intervalsRef.current.forEach((interval) => clearInterval(interval));
      intervalsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }, []);

  return <>{children}</>;
}
