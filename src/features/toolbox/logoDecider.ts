import set from "lodash.set";
import type { Tool } from "./getTools";

type ThemeLogoStyle = {
  backgroundColor?: string;
  color?: string;
  icon?: string;
  logo?: string;
  symbol?: string;
  banner?: string;
};
type LogosByTheme = {
  dark: ThemeLogoStyle;
  light: ThemeLogoStyle;
};
export const generateThemeLogos = (tool: Tool) => {
  const result: LogosByTheme = {
    dark: {},
    light: {},
  };
  const setIfEnabled = (key: string, value: string) => {
    if (!tool.brandfetchIgnore?.includes(key)) {
      set(result, key, value);
    }
  };

  // find the images with the smallest size
  const images = tool.brand.logos.map(({ formats, theme, type }) => {
    const smallestImage = formats.reduce((prev, curr) =>
      prev.size < curr.size ? prev : curr,
    );
    return {
      src: smallestImage.src,
      size: smallestImage.size,
      theme,
      type,
    };
  });

  for (const image of images) {
    const themes: Array<"dark" | "light"> =
      image.theme && image.type !== "icon" ? [image.theme] : ["dark", "light"];
    for (const theme of themes) {
      setIfEnabled(`${theme}.${image.type}`, image.src);
    }
  }

  return { dark: result.light, light: result.dark };
};
