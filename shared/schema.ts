import { pgTable, text, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Games table
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  sport: varchar("sport", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  date: varchar("date", { length: 50 }),
  time: varchar("time", { length: 50 }),
  maxPlayers: integer("max_players").default(10),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
  organizerId: integer("organizer_id").references(() => users.id),
});

// Players table
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  sport: varchar("sport", { length: 50 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  organizedGames: many(games),
}));

export const gamesRelations = relations(games, ({ one }) => ({
  organizer: one(users, {
    fields: [games.organizerId],
    references: [users.id],
  }),
}));

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  createdAt: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
