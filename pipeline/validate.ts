import { readFileSync } from "node:fs";
import path from "node:path";
import { MAJOR_BY_SLUG } from "../lib/majors";
import { TRACK_BY_SLUG } from "../lib/tracks";

/**
 * Validates the hand-edited files in data/curated/. Runs in CI on every pull
 * request (via `bun test`) and at the start of every refresh, so a typo in a
 * contribution can't quietly break the live site.
 */

const CATEGORIES = new Set(["on-campus", "research", "nwa"]);
const TYPES = new Set(["part-time", "extra-help", "work-study", "internship", "research-assistant", "program"]);
const ID = /^[a-z0-9][a-z0-9-]*$/;

type Row = Record<string, unknown>;

function load(file: string): Row[] {
  const full = path.join(process.cwd(), "data", "curated", file);
  const parsed = JSON.parse(readFileSync(full, "utf8"));
  if (!Array.isArray(parsed)) throw new Error(`${file}: expected a JSON array`);
  return parsed as Row[];
}

function checkCommon(file: string, rows: Row[], required: string[], errors: string[]): void {
  const seen = new Set<string>();
  rows.forEach((row, i) => {
    const where = `${file}[${i}]${typeof row.id === "string" ? ` (${row.id})` : ""}`;
    for (const key of required) {
      const v = row[key];
      if (v === undefined || v === null || (typeof v === "string" && v.trim() === "" && key !== "pi")) {
        errors.push(`${where}: missing "${key}"`);
      }
    }
    if (typeof row.id === "string") {
      if (!ID.test(row.id)) errors.push(`${where}: id must be lowercase-kebab-case`);
      if (seen.has(row.id)) errors.push(`${where}: duplicate id`);
      seen.add(row.id);
    }
    if (Array.isArray(row.majors)) {
      for (const m of row.majors) {
        if (!MAJOR_BY_SLUG.has(String(m))) errors.push(`${where}: unknown major "${m}"`);
      }
    } else if ("majors" in row || required.includes("majors")) {
      errors.push(`${where}: "majors" must be an array (use [] for any major)`);
    }
    for (const key of ["url", "applyUrl"]) {
      if (typeof row[key] === "string" && !/^https:\/\//.test(row[key] as string)) {
        errors.push(`${where}: "${key}" must be an https:// URL`);
      }
    }
  });
}

export function validateCurated(): string[] {
  const errors: string[] = [];

  const programs = load("programs.json");
  checkCommon("programs.json", programs, ["id", "title", "org", "category", "type", "majors", "location", "blurb", "applyUrl"], errors);
  programs.forEach((p, i) => {
    if (!CATEGORIES.has(String(p.category))) errors.push(`programs.json[${i}]: bad category "${p.category}"`);
    if (!TYPES.has(String(p.type))) errors.push(`programs.json[${i}]: bad type "${p.type}"`);
  });

  const labs = load("labs.json");
  checkCommon("labs.json", labs, ["id", "name", "pi", "department", "majors", "areas", "url"], errors);

  const clubs = load("clubs.json");
  checkCommon("clubs.json", clubs, ["id", "name", "majors", "tracks", "blurb", "searchTerm"], errors);
  clubs.forEach((c, i) => {
    if (!Array.isArray(c.tracks)) return;
    for (const t of c.tracks) {
      if (!TRACK_BY_SLUG.has(String(t))) errors.push(`clubs.json[${i}]: unknown track "${t}"`);
    }
  });

  return errors;
}

if (import.meta.main) {
  const errors = validateCurated();
  if (errors.length > 0) {
    console.error(`Curated data has ${errors.length} problem(s):\n  - ${errors.join("\n  - ")}`);
    process.exit(1);
  }
  console.log("Curated data OK.");
}
