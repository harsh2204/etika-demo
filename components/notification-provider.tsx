"use client";

import { useEffect, useRef } from "react";
import { NotificationBadge } from "@/components/notification-badge";

interface NotificationProviderProps {
  children: React.ReactNode;
  upcomingCount: number;
}

export function NotificationProvider({
  children,
  upcomingCount,
}: NotificationProviderProps) {
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const permissionRequestedRef = useRef(false);

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

    const checkAndNotify = async () => {
      if (Notification.permission === "granted" && upcomingCount > 0) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification("Upcoming Todos", {
            body: `You have ${upcomingCount} ${upcomingCount === 1 ? "task" : "tasks"} due soon`,
            tag: "upcoming-todos",
            requireInteraction: false,
          });
        } catch (error) {
          console.error("Failed to show notification:", error);
        }
      }
    };

    notificationIntervalRef.current = setInterval(() => {
      if (upcomingCount > 0) {
        checkAndNotify();
      }
    }, 15 * 60 * 1000);

    return () => {
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    };
  }, [upcomingCount]);

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
