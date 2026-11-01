import { expect, test } from "bun:test";
import { validateCurated } from "./validate";

// Runs in CI on every pull request: a bad edit to data/curated/*.json fails here
// with a readable message instead of breaking the live site.
test("curated programs, labs and clubs are valid", () => {
  expect(validateCurated()).toEqual([]);
});
