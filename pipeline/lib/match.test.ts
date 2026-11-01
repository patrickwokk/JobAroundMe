import { describe, expect, test } from "bun:test";
import { matchMajors } from "./match";

describe("matchMajors", () => {
  test("tags a clearly technical posting to EECS", () => {
    expect(matchMajors("Student software developer for web applications")).toContain("eecs");
  });

  test("matches on word boundaries only ('academic' is not 'cad')", () => {
    expect(matchMajors("Academic Tutor")).not.toContain("mech-civil-ind");
  });

  test("treats boilerplate that matches half the campus as 'any major'", () => {
    const generic =
      "software accounting nursing physics agriculture psychology design civil biomedical engineering";
    expect(matchMajors(generic)).toEqual([]);
  });

  test("returns [] when nothing matches", () => {
    expect(matchMajors("Ticket office window staff")).toEqual([]);
  });
});
