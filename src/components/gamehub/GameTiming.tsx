import {
  useEffect,
  useState,
} from "react";

import {
  countdown,
  gameLiveEndTime,
  type Game,
} from "@/lib/gamehub-data";

const MAX_BROWSER_TIMEOUT_MS = 2_147_000_000;

export function useGameTimingBoundary(
  game: Game | null | undefined,
) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!game?.kickoff) {
      return;
    }

    const now = Date.now();
    const kickoff = new Date(game.kickoff).getTime();
    const liveEnd = gameLiveEndTime(game);

    const nextBoundary = [kickoff, liveEnd]
      .filter(
        (value): value is number =>
          typeof value === "number" &&
          Number.isFinite(value) &&
          value > now,
      )
      .sort((a, b) => a - b)[0];

    if (!nextBoundary) {
      return;
    }

    const delay = Math.min(
      Math.max(nextBoundary - now + 250, 250),
      MAX_BROWSER_TIMEOUT_MS,
    );

    const timer = window.setTimeout(() => {
      setVersion((value) => value + 1);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    game?.id,
    game?.kickoff,
    game?.endTime,
    game?.sport,
    game?.status,
    version,
  ]);
}

export function LiveCountdown({
  target,
}: {
  target: string;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setTick((value) => value + 1);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [target]);

  return <>{countdown(target)}</>;
}
