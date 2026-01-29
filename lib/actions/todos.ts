"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { todos } from "@/lib/db/schema";
import { eq, and, lte, gte, isNotNull } from "drizzle-orm";
import { asc } from "drizzle-orm";

export async function getTodos() {
  const allTodos = await db
    .select()
    .from(todos)
    .orderBy(asc(todos.dueDate));
  return allTodos;
}

export async function createTodo(data: {
  title: string;
  description?: string;
  dueDate?: Date;
}) {
  await db.insert(todos).values({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
  });
  revalidatePath("/");
}

export async function toggleTodo(id: number) {
  const todo = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
  if (todo.length === 0) return;

  await db
    .update(todos)
    .set({ completed: !todo[0].completed })
    .where(eq(todos.id, id));
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function getUpcomingTodos() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);

  const upcoming = await db
    .select()
    .from(todos)
    .where(
      and(
        eq(todos.completed, false),
        isNotNull(todos.dueDate),
        lte(todos.dueDate, tomorrow),
        gte(todos.dueDate, now)
      )
    );
  return upcoming;
}

export async function getUpcomingCount() {
  const upcoming = await getUpcomingTodos();
  return upcoming.length;
}

export async function getTodosDueIn1Day() {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const windowMs = 2 * 60 * 1000;
  const targetTime = now.getTime() + oneDayInMs;
  const windowStart = new Date(targetTime - windowMs);
  const windowEnd = new Date(targetTime + windowMs);

  const todosDue = await db
    .select()
    .from(todos)
    .where(
      and(
        eq(todos.completed, false),
        isNotNull(todos.dueDate),
        gte(todos.dueDate, windowStart),
        lte(todos.dueDate, windowEnd)
      )
    );
  return todosDue;
}

export async function getTodosDueIn15Min() {
  const now = new Date();
  const fifteenMinInMs = 15 * 60 * 1000;
  const windowMs = 60 * 1000;
  const targetTime = now.getTime() + fifteenMinInMs;
  const windowStart = new Date(targetTime - windowMs);
  const windowEnd = new Date(targetTime + windowMs);

  const todosDue = await db
    .select()
    .from(todos)
    .where(
      and(
        eq(todos.completed, false),
        isNotNull(todos.dueDate),
        gte(todos.dueDate, windowStart),
        lte(todos.dueDate, windowEnd)
      )
    );
  return todosDue;
}

export async function getTodosDueIn1Min() {
  const now = new Date();
  const oneMinInMs = 60 * 1000;
  const windowMs = 30 * 1000;
  const targetTime = now.getTime() + oneMinInMs;
  const windowStart = new Date(targetTime - windowMs);
  const windowEnd = new Date(targetTime + windowMs);

  const todosDue = await db
    .select()
    .from(todos)
    .where(
      and(
        eq(todos.completed, false),
        isNotNull(todos.dueDate),
        gte(todos.dueDate, windowStart),
        lte(todos.dueDate, windowEnd)
      )
    );
  return todosDue;
}
