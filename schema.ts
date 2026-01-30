import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  path: text("path").notNull(),
  description: text("description"),
  isExternal: boolean("is_external").default(false),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default("Untitled Document"),
  content: text("content").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAppSchema = createInsertSchema(apps).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, timestamp: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, updatedAt: true });

export type App = typeof apps.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Document = typeof documents.$inferSelect;

export type CreateMessageRequest = z.infer<typeof insertMessageSchema>;
export type CreateDocumentRequest = z.infer<typeof insertDocumentSchema>;
export type UpdateDocumentRequest = Partial<CreateDocumentRequest>;
