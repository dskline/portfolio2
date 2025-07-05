import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Projects } from "@/features/projects/Projects";
import type { Project } from "@/features/projects/schema";

// Mock data for projects
const mockProjects: Project[] = [
  {
    title: "UserVoice Feedback Capture",
    subtitle: "Work Project",
    children:
      "A browser extension for capturing product feedback wherever you are on the web. Requires and integrates into an existing UserVoice instance.",
    date: new Date("2024-01-15"),
    githubUrl: "https://github.com/example/uservoice-feedback",
    images: [
      "https://res.cloudinary.com/frontendlive/ar_5:3,c_fill,g_auto/portfolio2/unnamed.jpg",
    ],
  },
  {
    title: "UserVoice Validation",
    subtitle: "Work Project",
    children:
      "A product feedback tool that lets companies test and validate product ideas or features with targeted users before development. It gathers user feedback and votes to help teams prioritize what to build based on real demand.",
    date: new Date("2023-11-20"),
    githubUrl: "https://github.com/example/uservoice-validation",
    images: [
      "https://res.cloudinary.com/frontendlive/ar_5:3,c_fill,g_west/portfolio2/uv_validation_2.png",
      "https://res.cloudinary.com/frontendlive/ar_16:9,c_fill,g_north/portfolio2/uv_validation_1.png",
    ],
  },
  {
    title: "Portfolio Website",
    subtitle: "Personal Project",
    children:
      "The second version of my portfolio built with Next.js, featuring a modern design and interactive components.",
    date: new Date("2023-08-10"),
    githubUrl: "https://github.com/example/portfolio-v2",
    images: [],
  },
];

const meta = {
  title: "Features/Projects",
  component: Projects,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Portfolio showcase component that displays project information with interactive image galleries and GitHub links.",
      },
    },
  },
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: mockProjects,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default view showing multiple projects with images, descriptions, and GitHub links.",
      },
    },
  },
};

export const SingleProject: Story = {
  args: {
    projects: [mockProjects[0]],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Display with only one project to show individual project layout.",
      },
    },
  },
};

export const ProjectsWithoutImages: Story = {
  args: {
    projects: [
      {
        ...mockProjects[2],
        images: [],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Projects that have no images to test the layout without image gallery.",
      },
    },
  },
};

export const ProjectsWithoutGitHub: Story = {
  args: {
    projects: [
      {
        ...mockProjects[0],
        githubUrl: undefined,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Projects that have no GitHub links to test graceful degradation.",
      },
    },
  },
};

export const MultipleImages: Story = {
  args: {
    projects: [mockProjects[1]], // UserVoice Validation has 2 images
  },
  parameters: {
    docs: {
      description: {
        story: "Projects with multiple images to showcase the gallery layout.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    projects: [],
  },
  parameters: {
    docs: {
      description: {
        story: "What happens when no projects are provided.",
      },
    },
  },
};

export const DateSorting: Story = {
  args: {
    projects: [
      { ...mockProjects[2], date: new Date("2020-01-01") }, // Oldest
      { ...mockProjects[0], date: new Date("2024-01-15") }, // Newest
      { ...mockProjects[1], date: new Date("2023-11-20") }, // Middle
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates that projects are automatically sorted by date with the newest projects appearing first.",
      },
    },
  },
};
