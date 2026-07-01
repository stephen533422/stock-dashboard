import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useIsWatched, toggleWatched } from "../hooks/useWatchlist";

interface WatchButtonProps {
  symbol: string;
}

export function WatchButton({ symbol }: Readonly<WatchButtonProps>) {
  const watched = useIsWatched(symbol);
  const { t } = useTranslation();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatched(symbol);
  };

  return (
    <button
      type="button"
      className="watch-btn"
      data-watched={watched}
      aria-label={t(watched ? "watch.remove" : "watch.add")}
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={watched ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
