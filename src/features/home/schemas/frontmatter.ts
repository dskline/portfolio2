// TODO: Create zod schema validation for frontmatter fields (#EPIC_2_b)
// Should validate: component, portraitSrc, lexorank, and other component-specific props

import { z } from "zod";

// TODO: Define base frontmatter schema
export const baseFrontmatterSchema = z.object({
  component: z.string(),
  lexorank: z.string().optional(),
});

// TODO: Define HeroSection-specific schema
export const heroSectionSchema = baseFrontmatterSchema.extend({
  component: z.literal("HeroSection"),
  title: z.string(),
  subtitle: z.string().optional(),
  portraitSrc: z.string().optional(),
});

// TODO: Define Custom component schema
export const customComponentSchema = baseFrontmatterSchema.extend({
  component: z.literal("Custom"),
});

// TODO: Create union schema for all component types
export const frontmatterSchema = z.union([
  heroSectionSchema,
  customComponentSchema,
]);

export type FrontmatterData = z.infer<typeof frontmatterSchema>;
