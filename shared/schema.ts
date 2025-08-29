import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  fileName: text("file_name").notNull(),
  originalContent: text("original_content"),
  parsedContent: jsonb("parsed_content"),
  optimizedVersions: jsonb("optimized_versions"),
  analysisScore: integer("analysis_score"),
  keywords: text("keywords").array(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  jobTitle: text("job_title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  salary: text("salary"),
  status: text("status").notNull(),
  platform: text("platform"),
  jobUrl: text("job_url"),
  resumeId: varchar("resume_id").references(() => resumes.id),
  coverLetterId: varchar("cover_letter_id"),
  priority: text("priority"),
  notes: text("notes"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  externalId: text("external_id"),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  description: text("description"),
  salary: text("salary"),
  url: text("url"),
  platform: text("platform"),
  matchScore: integer("match_score"),
  isApplied: boolean("is_applied").default(false),
  discoveredAt: timestamp("discovered_at").defaultNow(),
});

export const coverLetters = pgTable("cover_letters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  applicationId: varchar("application_id").references(() => jobApplications.id),
  content: text("content").notNull(),
  tone: text("tone"),
  template: text("template"),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const companyResearch = pgTable("company_research", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: text("company").notNull().unique(),
  industry: text("industry"),
  size: text("size"),
  funding: text("funding"),
  recentNews: jsonb("recent_news"),
  keyPeople: jsonb("key_people"),
  culture: text("culture"),
  techStack: text("tech_stack").array(),
  headquarters: text("headquarters"),
  founded: text("founded"),
  website: text("website"),
  researchedAt: timestamp("researched_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  totalApplications: integer("total_applications").default(0),
  totalContacts: integer("total_contacts").default(0),
  totalDocuments: integer("total_documents").default(0),
  responseRate: integer("response_rate").default(0),
  interviewsScheduled: integer("interviews_scheduled").default(0),
  jobOffers: integer("job_offers").default(0),
  emailsSentToday: integer("emails_sent_today").default(0),
  aiGenerationsUsed: integer("ai_generations_used").default(0),
  aiGenerationsToday: integer("ai_generations_today").default(0),
  lastGenerationDate: timestamp("last_generation_date"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// AI Usage Tracking for daily limits and analytics
export const aiUsage = pgTable("ai_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  operationType: text("operation_type").notNull(), // 'resume_check', 'resume_build', 'cover_letter'
  requestHash: text("request_hash").notNull(), // Hash of input for deduplication
  tokensUsed: integer("tokens_used").default(0),
  costEstimate: integer("cost_estimate").default(0), // in cents
  status: text("status").notNull(), // 'pending', 'completed', 'failed', 'cached'
  createdAt: timestamp("created_at").defaultNow(),
});

// AI Content Cache for preventing duplicate generations
export const aiCache = pgTable("ai_cache", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestHash: text("request_hash").notNull().unique(),
  operationType: text("operation_type").notNull(),
  inputData: jsonb("input_data").notNull(),
  outputData: jsonb("output_data").notNull(),
  tokensUsed: integer("tokens_used").default(0),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  accessCount: integer("access_count").default(1),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

// User Credits and Limits
export const userCredits = pgTable("user_credits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  plan: text("plan").notNull().default("free"), // 'free', 'pro'
  dailyLimit: integer("daily_limit").notNull().default(5), // AI generations per day
  monthlyLimit: integer("monthly_limit").notNull().default(100), // Total per month
  dailyUsed: integer("daily_used").default(0),
  monthlyUsed: integer("monthly_used").default(0),
  lastResetDate: timestamp("last_reset_date").defaultNow(),
  totalCreditsUsed: integer("total_credits_used").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User visit tracking for upgrade prompts
export const userVisits = pgTable("user_visits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  visitDate: timestamp("visit_date").defaultNow(),
  sessionId: varchar("session_id"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
});

// Site visits summary for quick access
export const userVisitSummary = pgTable("user_visit_summary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  totalVisits: integer("total_visits").default(0),
  uniqueDays: integer("unique_days").default(0),
  lastVisitDate: timestamp("last_visit_date").defaultNow(),
  firstVisitDate: timestamp("first_visit_date").defaultNow(),
  upgradePromptShown: boolean("upgrade_prompt_shown").default(false),
  upgradePromptDate: timestamp("upgrade_prompt_date"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Festive offers system
export const festiveOffers = pgTable("festive_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // "Ganesh Chaturthi Special"
  description: text("description").notNull(),
  discountType: text("discount_type").notNull(), // "percentage", "fixed"
  discountValue: integer("discount_value").notNull(), // 50 for 50%
  validFrom: timestamp("valid_from").notNull(),
  validUntil: timestamp("valid_until").notNull(),
  isActive: boolean("is_active").default(true),
  offerCode: text("offer_code").unique(), // "GANESH50"
  targetPlan: text("target_plan"), // "pro", "all"
  billingCycle: text("billing_cycle"), // "6months", "annual"
  createdAt: timestamp("created_at").defaultNow(),
});

// Track offer usage
export const offerUsage = pgTable("offer_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  offerId: varchar("offer_id").references(() => festiveOffers.id).notNull(),
  usedAt: timestamp("used_at").defaultNow(),
  orderValue: integer("order_value"), // in cents
  discountAmount: integer("discount_amount"), // in cents
  finalAmount: integer("final_amount"), // in cents
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  userId: true,
  fileName: true,
  originalContent: true,
  parsedContent: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  userId: true,
  jobTitle: true,
  company: true,
  location: true,
  salary: true,
  status: true,
  platform: true,
  jobUrl: true,
  resumeId: true,
  priority: true,
  notes: true,
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  externalId: true,
  title: true,
  company: true,
  location: true,
  description: true,
  salary: true,
  url: true,
  platform: true,
  matchScore: true,
});

export const insertCoverLetterSchema = createInsertSchema(coverLetters).pick({
  userId: true,
  applicationId: true,
  content: true,
  tone: true,
  template: true,
});

export const insertCompanyResearchSchema = createInsertSchema(companyResearch).pick({
  company: true,
  industry: true,
  size: true,
  funding: true,
  recentNews: true,
  keyPeople: true,
  culture: true,
  techStack: true,
  headquarters: true,
  founded: true,
  website: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertCoverLetter = z.infer<typeof insertCoverLetterSchema>;
export type InsertCompanyResearch = z.infer<typeof insertCompanyResearchSchema>;

export type User = typeof users.$inferSelect;
export type Resume = typeof resumes.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type CoverLetter = typeof coverLetters.$inferSelect;
export type CompanyResearch = typeof companyResearch.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;
export type AiUsage = typeof aiUsage.$inferSelect;
export type AiCache = typeof aiCache.$inferSelect;
export type UserCredits = typeof userCredits.$inferSelect;
export type UserVisits = typeof userVisits.$inferSelect;
export type UserVisitSummary = typeof userVisitSummary.$inferSelect;
export type FestiveOffers = typeof festiveOffers.$inferSelect;
export type OfferUsage = typeof offerUsage.$inferSelect;
