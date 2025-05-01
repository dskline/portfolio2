export const toggleDarkTheme = () => {
  const isDark = isDarkTheme();

  document.documentElement.classList.toggle("dark", !isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
};

const isDarkTheme = () => {
  return typeof window === "undefined"
    ? false
    : localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
};
