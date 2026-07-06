import type { MajorGroup } from "./types";

/**
 * Ten major groups covering the Fayetteville campus. Grouped by community —
 * who shares labs, buildings and employers — rather than strict org chart.
 */
export const MAJOR_GROUPS: MajorGroup[] = [
  {
    slug: "eecs",
    name: "Electrical Engineering & Computer Science",
    shortName: "EECS",
    college: "College of Engineering",
    blurb:
      "Chips to cloud: research labs across campus need students who can code, solder and debug — and NWA's tech employers hire aggressively from this pool.",
    examples: ["Computer Science", "Computer Engineering", "Electrical Engineering", "Data Science"],
    keywords: [
      "software", "developer", "programmer", "computer", "coding", "data",
      "it support", "help desk", "web", "network", "cyber", "electrical",
      "electronics", "circuit", "embedded", "machine learning", "ai",
    ],
  },
  {
    slug: "mech-civil-ind",
    name: "Mechanical, Civil & Industrial Engineering",
    shortName: "MEEG · CVEG · INEG",
    college: "College of Engineering",
    blurb:
      "Design, build, move: from additive manufacturing labs to transportation research centers to the firms engineering NWA's growth spurt.",
    examples: ["Mechanical Engineering", "Civil Engineering", "Industrial Engineering", "Architectural Studies"],
    keywords: [
      "mechanical", "civil", "industrial", "manufacturing", "cad", "hvac",
      "structural", "transportation", "construction", "facilities", "surveying",
      "logistics engineer",
    ],
  },
  {
    slug: "biomed-chem",
    name: "Biomedical & Chemical Engineering",
    shortName: "BMEG · CHEG",
    college: "College of Engineering",
    blurb:
      "Wet-lab engineering: tissue imaging, gene editing, membranes and materials. Undergrad research assistants are the workforce of these labs.",
    examples: ["Biomedical Engineering", "Chemical Engineering", "Biological Engineering"],
    keywords: [
      "biomedical", "chemical engineering", "bioprocess", "biomaterials",
      "tissue", "pharmaceutical", "polymer",
    ],
  },
  {
    slug: "business",
    name: "Business",
    shortName: "Walton",
    college: "Sam M. Walton College of Business",
    blurb:
      "You're studying business a 25-minute drive from the world's largest retailer, plus J.B. Hunt and 1,300 supplier offices. Use that.",
    examples: ["Supply Chain", "Finance", "Information Systems", "Marketing", "Accounting", "Economics"],
    keywords: [
      "accounting", "finance", "marketing", "supply chain", "business",
      "clerical", "administrative", "office assistant", "sales", "hr",
      "human resources", "payroll", "procurement", "analyst",
    ],
  },
  {
    slug: "life-sciences",
    name: "Biology & Life Sciences",
    shortName: "Life Sci",
    college: "Fulbright College of Arts & Sciences",
    blurb:
      "Pre-health and bio students: professors here run funded labs in genomics, ecology and neuroscience — and med schools want to see real bench time.",
    examples: ["Biology", "Biochemistry", "Pre-Med / Pre-Health", "Microbiology"],
    keywords: [
      "biology", "biological", "lab assistant", "laboratory", "research assistant",
      "greenhouse", "animal care", "vivarium", "specimen", "ecology", "genomics",
    ],
  },
  {
    slug: "physical-sciences",
    name: "Physics, Chemistry & Math",
    shortName: "Phys Sci",
    college: "Fulbright College of Arts & Sciences",
    blurb:
      "Quantum materials, nano-fabrication, computational chemistry — plus steady demand for graders and tutors in the math and science core.",
    examples: ["Physics", "Chemistry", "Mathematics", "Geosciences", "Statistics"],
    keywords: [
      "physics", "chemistry", "mathematics", "statistics",
      "quantum", "materials science", "geology",
    ],
  },
  {
    slug: "ag-food",
    name: "Agriculture & Food Science",
    shortName: "Bumpers",
    college: "Bumpers College of Agricultural, Food & Life Sciences",
    blurb:
      "Tyson, Simmons and George's run their empires from this metro. Food science and ag students have an unusually direct pipeline to industry.",
    examples: ["Food Science", "Animal Science", "Poultry Science", "Agricultural Business", "Crop Science"],
    keywords: [
      "agriculture", "farm", "food science", "poultry", "animal science",
      "horticulture", "extension", "crop", "livestock",
    ],
  },
  {
    slug: "health-education",
    name: "Nursing, Health & Education",
    shortName: "COEHP",
    college: "College of Education & Health Professions",
    blurb:
      "Clinical hours, camp counseling, coaching, tutoring — the jobs in this group double as the field experience your license or program requires.",
    examples: ["Nursing", "Public Health", "Kinesiology", "Education", "Communication Disorders"],
    keywords: [
      "nursing", "health", "clinic", "patient", "childcare", "child care",
      "teacher", "teaching", "camp", "coach", "fitness", "recreation",
      "lifeguard", "wellness",
    ],
  },
  {
    slug: "social-sciences",
    name: "Psychology & Social Sciences",
    shortName: "Social Sci",
    college: "Fulbright College of Arts & Sciences",
    blurb:
      "Psych labs run on undergraduate RAs. Poli sci and sociology students: research centers and nonprofits here need survey, data and field help.",
    examples: ["Psychology", "Political Science", "Sociology", "Social Work", "Criminology"],
    keywords: [
      "psychology", "social work", "survey research", "advocacy", "counseling",
      "case management", "nonprofit",
    ],
  },
  {
    slug: "arts-humanities",
    name: "Arts, Media & Humanities",
    shortName: "Arts",
    college: "Fulbright College · Fay Jones School",
    blurb:
      "A world-class art museum 30 minutes away, a university press, athletics media, and design studios — creative work that pays and publishes.",
    examples: ["Journalism", "English", "Graphic Design", "Music", "Architecture", "Communication"],
    keywords: [
      "writing", "editor", "media", "video", "photo", "design", "graphic",
      "museum", "gallery", "music", "communication", "marketing content",
      "social media", "broadcast", "architecture",
    ],
  },
];

export const MAJOR_BY_SLUG = new Map(MAJOR_GROUPS.map((m) => [m.slug, m]));

export function majorName(slug: string): string {
  return MAJOR_BY_SLUG.get(slug)?.name ?? slug;
}

export function majorShortName(slug: string): string {
  return MAJOR_BY_SLUG.get(slug)?.shortName ?? slug;
}
