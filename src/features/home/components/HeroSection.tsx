import clsx from "clsx";
import Image from "next/image";
import type React from "react";
import type { HeroSectionProps } from "@/features/home/schemas";

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  portraitSrc,
  children,
  isOpenForWork,
}) => {
  return (
    <div className="@container w-full">
      <section className="mx-auto grid @xl:max-w-3xl @xl:grid-cols-[1fr_auto] gap-8 py-12">
        <div
          className={clsx(
            "relative @xl:row-end-1 flex flex-col justify-center gap-2 @xl:text-left text-center",
          )}
        >
          {isOpenForWork && (
            <div
              className={clsx(
                "absolute top-0 left-0",
                "inline-flex items-center self-center",
                "rounded-full bg-cyan-100 px-4 py-1 dark:bg-cyan-900",
                "font-semibold text-cyan-700 text-xs shadow-sm dark:text-cyan-200",
                "ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-light dark:ring-cyan-300/40 dark:ring-offset-dark",
              )}
            >
              <span
                role="presentation"
                className={clsx(
                  "mr-2",
                  "inline-block h-2 w-2",
                  "rounded-full bg-cyan-400 dark:bg-cyan-300",
                  "shadow-cyan-400/40 shadow-md dark:shadow-cyan-300/40",
                )}
              />
              AVAILABLE FOR WORK
            </div>
          )}
          <h1 className="font-extrabold text-4xl">{title}</h1>
          {subtitle && <span className="text-lg">{subtitle}</span>}
        </div>
        {portraitSrc && (
          <div
            className={clsx(
              "mx-auto h-32 w-32 rounded-full",
              "@xl:col-start-2 @xl:h-48 @xl:w-48 @xl:rounded-2xl",
              "overflow-hidden",
              "border-4 border-light dark:border-dark",
              "shadow-lg dark:shadow-cyan-900/40",
            )}
          >
            <Image
              src={portraitSrc}
              alt="Author Portrait"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}
        {children && (
          <div
            className="@xl:col-span-2 text-justify"
            data-testid="hero-children"
          >
            {children}
          </div>
        )}
      </section>
    </div>
  );
};

export default HeroSection;
