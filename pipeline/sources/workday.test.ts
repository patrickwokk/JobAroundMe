import { describe, expect, test } from "bun:test";
import { isStudentHoldable } from "./workday";

// Real titles from the U of A careers feed.
describe("isStudentHoldable", () => {
  test("keeps part-time roles", () => {
    expect(isStudentHoldable("Athletic Facilities Service Assistant", "Part time")).toBe(true);
    expect(isStudentHoldable("Program Coordinator", "Part time")).toBe(true);
  });

  test("drops full-time staff careers, even with 'assistant' in the title", () => {
    expect(isStudentHoldable("Accounting Assistant III", "Full time")).toBe(false);
    expect(isStudentHoldable("Assistant Foreman – Maintenance", "Full time")).toBe(false);
    expect(isStudentHoldable("Student Financials & Business Invoice Collections Analyst", "Full time")).toBe(false);
    expect(isStudentHoldable("Career and Internship Connections Coordinator", "Full time")).toBe(false);
  });

  test("keeps full-time postings explicitly marked hourly or student", () => {
    expect(isStudentHoldable("Extra Help Assistant - Hourly", "Full time")).toBe(true);
    expect(isStudentHoldable("Graduate Assistant – Data Analysis", "Full time")).toBe(true);
  });

  test("falls back to the title when the time type is missing", () => {
    expect(isStudentHoldable("Extra Help Assistant- Child Care Aide")).toBe(true);
    expect(isStudentHoldable("Associate Director of Development")).toBe(false);
  });

  test("never lists faculty or leadership", () => {
    expect(isStudentHoldable("Lecturer- Department of Marketing", "Part time")).toBe(false);
    expect(isStudentHoldable("Assistant Women's Tennis Coach", "Part time")).toBe(false);
  });
});
