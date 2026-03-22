ALTER TABLE "users" ADD COLUMN "langs" varchar[] NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "exp" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "skills";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_github_unique" UNIQUE("github");