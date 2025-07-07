import clsx from "clsx";
import Image from "next/image";
import type React from "react";
import { AvailableForWork } from "@/features/home/components/HeroSection/AvailableForWork";
import type { HeroSectionProps } from "@/features/home/components/HeroSection/schema";

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  portraitSrc,
  children,
  isOpenForWork,
}) => {
  return (
    <div className="@container w-full">
      <section className="mx-auto grid @xl:max-w-3xl @xl:grid-cols-[1fr_auto] gap-6 py-12">
        <div
          className={clsx(
            "relative @xl:row-end-1 flex @xl:flex-col justify-center gap-4 @xl:text-left text-center",
          )}
        >
          {isOpenForWork && (
            // Relocated to the bottom on mobile
            <AvailableForWork className="-left-full absolute top-0 @xl:left-0" />
          )}
          <div className="space-y-2">
            <h1 className="font-extrabold text-4xl">{title}</h1>
            {subtitle && <span className="text-lg">{subtitle}</span>}
          </div>
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
        <div className="flex justify-end">
          {/* TODO: Hidden until contact button is implemented */}
          {/* {isOpenForWork && <AvailableForWork className="@xl:hidden" />} */}
          {/* Placeholder for contact button */}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
