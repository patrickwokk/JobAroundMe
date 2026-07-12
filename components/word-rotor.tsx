import type { CSSProperties } from "react";

/**
 * CSS-only kinetic headline word: all words stack in one grid cell (sized to
 * the widest) and cycle via staggered animation delays. Screen readers get the
 * first word; reduced-motion users see it statically.
 */
export function WordRotor({ words, className = "" }: { words: string[]; className?: string }) {
  return (
    <span className={`inline-grid align-baseline ${className}`} aria-label={words[0]} role="text">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden
          data-rotor={i}
          className="rotor-word col-start-1 row-start-1 whitespace-nowrap"
          style={{ "--rotor-i": i } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
