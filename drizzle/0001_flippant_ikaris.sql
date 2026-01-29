PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` integer,
	`completed` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
INSERT INTO `__new_todos`("id", "title", "description", "due_date", "completed", "created_at") SELECT "id", "title", "description", "due_date", "completed", "created_at" FROM `todos`;--> statement-breakpoint
DROP TABLE `todos`;--> statement-breakpoint
ALTER TABLE `__new_todos` RENAME TO `todos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;