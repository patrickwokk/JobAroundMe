import { MAJOR_GROUPS } from "../../lib/majors";

/**
 * Auto-tag a scraped listing with major groups.
 * Keywords match on word boundaries ("cad" must not match "academic");
 * multi-word keywords tolerate any whitespace between words.
 * Returns [] when nothing (or nearly everything) matches — rendered as
 * "open to any major".
 */

function toPattern(keyword: string): RegExp {
  const escaped = keyword
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
  return new RegExp(`\\b${escaped}\\b`, "i");
}

const GROUP_PATTERNS = MAJOR_GROUPS.map((group) => ({
  slug: group.slug,
  patterns: group.keywords.map(toPattern),
}));

export function matchMajors(text: string): string[] {
  const hits: string[] = [];
  for (const group of GROUP_PATTERNS) {
    if (group.patterns.some((p) => p.test(text))) {
      hits.push(group.slug);
    }
  }
  // Matching half the campus means the text was generic, not the job specific.
  if (hits.length >= 5) return [];
  return hits;
}
