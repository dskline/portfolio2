import z from "zod";
import { baseContentRendererSchema } from "@/features/cms/renderer/schema";

export const heroSectionSchema = baseContentRendererSchema.extend({
  component: z.literal("HeroSection"),
  title: z.string(),
  subtitle: z.string().optional(),
  portraitSrc: z.string().optional(),
  isOpenForWork: z.boolean().optional(),
});

export type HeroSectionProps = z.infer<typeof heroSectionSchema>;
