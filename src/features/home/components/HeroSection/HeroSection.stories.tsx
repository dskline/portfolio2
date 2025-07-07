import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { HeroSectionProps } from "@/features/home/schemas";
import { HeroSection } from ".";

const meta = {
  title: "Features/Home/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Main heading" },
    subtitle: { control: "text", description: "Optional subheading" },
    portraitSrc: { control: "text", description: "Image URL or path" },
    children: { control: "text", description: "Optional children content" },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: "HeroSection",
    title: "Modern Web Developer",
    subtitle: "Building modern web experiences",
    portraitSrc: "/globe.svg",
    children:
      "Welcome to my portfolio! Here you'll find my projects, toolbox, and more.",
  } satisfies HeroSectionProps,
};

export const Minimal: Story = {
  args: {
    component: "HeroSection",
    title: "Modern Web Developer",
  } satisfies HeroSectionProps,
};

export const WithChildren: Story = {
  args: {
    component: "HeroSection",
    title: "Modern Web Developer",
    subtitle: "Building modern web experiences",
    portraitSrc: "/globe.svg",
    children: (
      <span>
        <strong>Custom content:</strong> This section can render any React node
        as children.
      </span>
    ),
  } satisfies HeroSectionProps,
};

export const OpenForWork: Story = {
  args: {
    component: "HeroSection",
    title: "Modern Web Developer",
    subtitle: "Building modern web experiences",
    portraitSrc: "/globe.svg",
    isOpenForWork: true,
    children:
      "Welcome to my portfolio! Here you'll find my projects, toolbox, and more.",
  } satisfies HeroSectionProps,
};
