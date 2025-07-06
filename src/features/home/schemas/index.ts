import { z } from "zod";
import { baseContentRendererSchema } from "@/features/cms/renderer/schema";

export const heroSectionSchema = baseContentRendererSchema.extend({
  component: z.literal("HeroSection"),
  title: z.string(),
  subtitle: z.string().optional(),
  portraitSrc: z.string().optional(),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;

export const homePageContent = z.discriminatedUnion("component", [
  heroSectionSchema,
  // Add other components here as needed
]);

export type HomePageContent = z.infer<typeof homePageContent>;
