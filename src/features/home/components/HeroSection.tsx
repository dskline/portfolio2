import clsx from "clsx";
import Image from "next/image";
import type React from "react";
import type { HeroSectionProps } from "@/features/home/schemas";

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  portraitSrc,
  children,
}) => {
  return (
    <div className="@container w-full">
      <section className="mx-auto grid @xl:max-w-3xl @xl:grid-cols-[1fr_auto] gap-8 py-12">
        <div
          className={clsx(
            "relative @xl:row-end-1 flex flex-col justify-center gap-2 @xl:text-left text-center",
          )}
        >
          <h1 className="font-extrabold text-4xl">{title}</h1>
          {subtitle && <span className="text-lg">{subtitle}</span>}
        </div>
        {portraitSrc && (
          <div
            className={clsx(
              "mx-auto h-32 w-32 rounded-full",
              "@xl:col-start-2 @xl:h-48 @xl:w-48 @xl:rounded-2xl",
              "overflow-hidden",
            )}
          >
            <Image
              src={portraitSrc}
              alt="Author Portrait"
              width={128}
              height={128}
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
