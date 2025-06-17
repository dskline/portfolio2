import GitHubIcon from "@/features/projects/assets/github.svg";
import type { Project } from "@/features/projects/getProjects";
import clsx from "clsx";
import Image from "next/image";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  let projectImageCounter = 0;

  const sortedProjects = projects.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div
      className="@container/Projects flex flex-col gap-24"
      data-testid="projects-container"
    >
      {sortedProjects.map((project) => (
        <article
          key={project.title}
          className="mx-auto grid @xl/Projects:w-3/4 w-full @5xl/Projects:grid-cols-[2fr_1fr] grid-cols-1 @5xl/Projects:gap-12 gap-y-8"
        >
          <div className="@container/ProjectInfo flex flex-col gap-4">
            <header className="flex flex-col-reverse gap-1">
              <h2 className="font-bold text-4xl uppercase">{project.title}</h2>
              <p className="font-semibold text-sm opacity-75">
                {project.subtitle}
              </p>
            </header>
            <p>{project.content}</p>
            <div className="flex flex-col gap-2">
              {project.githubUrl && (
                <div className="flex">
                  <a
                    href={project.githubUrl}
                    className={clsx(
                      "flex items-center gap-2 border-dark bg-light text-dark dark:invert",
                      "hocus:bg-dark hocus:text-light hocus:[&>img]:invert",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={GitHubIcon}
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    Source Code
                  </a>
                </div>
              )}
            </div>
          </div>
          {project.images && project.images.length > 0 && (
            <div className="relative min-h-48 min-w-64 justify-self-center">
              {project.images.map((image, index) => {
                projectImageCounter += 1;

                return (
                  <Image
                    key={`${project.title}-image-${index}`}
                    data-testid="project-image"
                    className={clsx(
                      "absolute inset-0 overflow-hidden",
                      "rounded-lg border-2 border-dark shadow-lg",
                      "transition-transform duration-300 ease-out",
                      "hover:z-10! hover:scale-150",
                      // Shuffle effect - slight rotation and offset for each image
                      projectImageCounter % 2 ? "rotate-3" : " -rotate-3",
                    )}
                    style={{
                      zIndex: index + 1,
                      translate: `${index % 2 ? index * 128 : 0}px ${index * 64}px`,
                    }}
                    src={image}
                    alt={`${project.title} image ${index + 1}`}
                    fill
                  />
                );
              })}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
