CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` integer,
	`completed` integer DEFAULT false,
	`created_at` integer DEFAULT '"2026-01-29T01:39:20.713Z"'
);
