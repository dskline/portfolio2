import { Projects } from "@/features/projects/Projects";
import type { Project } from "@/features/projects/getProjects";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Mock data for projects
const mockProjects: Project[] = [
  {
    title: "UserVoice Feedback Capture",
    subtitle: "Work Project",
    content:
      "A browser extension for capturing product feedback wherever you are on the web. Requires and integrates into an existing UserVoice instance.",
    date: new Date("2024-01-15"),
    githubUrl: "https://github.com/example/uservoice-feedback",
    images: [
      "v1734498915/Portfolio/Projects/UserVoice%20Feedback%20Capture/feedback-capture-preview_o4jkm6.png",
    ],
  },
  {
    title: "UserVoice Validation",
    subtitle: "Work Project",
    content:
      "A product feedback tool that lets companies test and validate product ideas or features with targeted users before development. It gathers user feedback and votes to help teams prioritize what to build based on real demand.",
    date: new Date("2023-11-20"),
    githubUrl: "https://github.com/example/uservoice-validation",
    images: [
      "v1734498915/Portfolio/Projects/UserVoice%20Validation/validation-preview_a8hkn2.png",
      "v1734498915/Portfolio/Projects/UserVoice%20Validation/validation-dashboard_m9plo4.png",
    ],
  },
  {
    title: "Portfolio Website",
    subtitle: "Personal Project",
    content:
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
  tags: ["autodocs"],
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Projects Display",
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
  name: "Single Project",
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
  name: "Projects Without Images",
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
  name: "Projects Without GitHub Links",
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
  name: "Projects With Multiple Images",
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
  name: "Empty State",
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
  name: "Date Sorting (Newest First)",
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
