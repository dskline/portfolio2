import clsx from "clsx";

type Props = {
  className?: string;
};
export const AvailableForWork = ({ className }: Props) => (
  <div
    className={clsx(
      className,
      "items-center self-center",
      "rounded-full bg-cyan-100 px-4 py-1 dark:bg-cyan-900",
      "font-semibold text-cyan-700 text-xs shadow-sm dark:text-cyan-200",
      "ring-2 ring-cyan-400/60 ring-offset-2 ring-offset-light dark:ring-cyan-300/40 dark:ring-offset-dark",
    )}
  >
    <span
      role="presentation"
      className={clsx(
        "mr-2 inline-block h-1.25 w-1.25 rounded-full",
        "animate-ping bg-cyan-400 dark:bg-cyan-300",
        "shadow-cyan-400/40 shadow-md dark:shadow-cyan-300/40",
      )}
    />
    AVAILABLE FOR WORK
  </div>
);
