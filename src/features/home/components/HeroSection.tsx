// TODO: Implement HeroSection component (#EPIC_3_b)
// This component should render hero banners with configurable styling and content
// Props: title, subtitle, portraitSrc, children (HTML content)

import Image from "next/image";
import type React from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  portraitSrc?: string;
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  portraitSrc,
  children,
}) => {
  // TODO: Implement hero section rendering logic
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {portraitSrc && (
        <Image
          src={portraitSrc}
          alt="Author Portrait"
          width={200}
          height={200}
        />
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default HeroSection;
