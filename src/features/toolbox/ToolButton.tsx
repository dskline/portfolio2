"use client";

import { clsx } from "clsx";
import type React from "react";
import type { Tool } from "./getTools";
import { generateThemeLogos } from "./logoDecider";

export function ToolButton(tool: Tool) {
  const themeLogos = generateThemeLogos(tool);

  return (
    <a
      key={tool.title}
      href={`https://${tool.brand.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "border-2 border-transparent hover:border-inherit rounded-md",
        "px-2.5 py-1 inline-flex gap-2 items-center justify-center",
        "bg-[var(--light-bg)] text-[var(--light-color)]",
        "dark:bg-[var(--dark-bg)] dark:text-[var(--dark-color)]",
        "transition-colors duration-200",
      )}
      style={
        {
          "--light-bg": themeLogos.light.backgroundColor || "inherit",
          "--dark-bg": themeLogos.dark.backgroundColor || "inherit",
          "--light-color": themeLogos.light.color || "inherit",
          "--dark-color": themeLogos.dark.color || "inherit",
        } as React.CSSProperties
      }
    >
      <ToolButtonImage tool={tool} themeLogos={themeLogos} type="symbol" />
      <ToolButtonImage tool={tool} themeLogos={themeLogos} type="logo" />
    </a>
  );
}

type ToolButtonImageProps = {
  tool: Tool;
  themeLogos: ReturnType<typeof generateThemeLogos>;
  type: "symbol" | "logo";
};
const ToolButtonImage = ({ tool, themeLogos, type }: ToolButtonImageProps) => {
  return (
    <div
      className={clsx("flex items-center", type === "symbol" ? "h-6" : "h-5")}
    >
      <EmptySourceProtector
        src={
          themeLogos.light[type] ||
          (type === "symbol" ? themeLogos.light.icon : "")
        }
        alt={tool.title}
        className="h-full dark:hidden"
        hideAlt={type === "symbol"}
      />
      <EmptySourceProtector
        src={
          themeLogos.dark[type] ||
          (type === "symbol" ? themeLogos.dark.icon : "")
        }
        alt={tool.title}
        className="hidden h-full dark:inline"
        hideAlt={type === "symbol"}
      />
    </div>
  );
};

const EmptySourceProtector = ({
  hideAlt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { hideAlt?: boolean }) =>
  props.src ? (
    <img {...props} alt={props.alt} />
  ) : hideAlt ? null : (
    <div className={clsx("flex items-center", props.className)}>
      <span className="text-xl font-mono leading-0">{props.alt}</span>
    </div>
  );
