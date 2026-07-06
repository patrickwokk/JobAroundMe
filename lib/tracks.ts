import type { Track } from "./types";

/**
 * Career tracks: destination-first navigation. Where majors answer "what do
 * you study," tracks answer "where are you trying to end up" — and lay out a
 * four-year ladder of jobs, labs and clubs from this site that get you there.
 */
export const TRACKS: Track[] = [
  {
    slug: "wall-street-finance",
    name: "High Finance",
    role: "Finance analyst — Wall Street, private equity, or Fortune 500 treasury",
    majors: ["business"],
    hook: "Investment banks recruit sophomores now. From Fayetteville, the path runs through Walton's finance orgs, a corporate-finance internship at an NWA giant, and relentless networking.",
    reality:
      "Be honest about the game: bulge-bracket banks hire from a short list of schools, so Arkansas students break in through referrals, boutique and regional banks (Stephens in Little Rock is a storied one), or two years at a Fortune 500 finance program — Walmart and Tyson run serious ones — before lateraling. GPA above 3.7, an investment-club track record, and alumni cold-emails are your levers. The composer on this site works on alumni too.",
    employerMatch: ["Walmart", "Arvest", "Tyson", "J.B. Hunt"],
    ladder: [
      { when: "Year 1", what: "Join Walton's finance and investment orgs; take a campus job with numbers in it (accounting assistant, financial services desk). Learn Excel like an instrument.", links: [{ label: "Business listings", href: "/jobs?major=business" }, { label: "Business clubs", href: "/clubs?major=business" }] },
      { when: "Year 2", what: "Run a pitch in the investment club; land a finance-adjacent internship at an NWA company — corporate finance, FP&A, or banking at Arvest.", links: [{ label: "NWA programs", href: "/jobs?where=nwa&major=business" }] },
      { when: "Year 3", what: "This is the summer that decides it: junior-year internship in IB, PE, or a Fortune 500 finance leadership program. Applications open August of sophomore year — earlier than you think.", links: [{ label: "Walmart internships", href: "/jobs?where=nwa" }] },
      { when: "Year 4", what: "Convert your offer or lateral: recruiters treat a Walmart/Tyson finance internship plus a CFA Level I pass as proof you're serious." },
    ],
  },
  {
    slug: "big-tech-swe",
    name: "Software Engineering",
    role: "Software engineer — big tech, unicorns, or high-growth startups",
    majors: ["eecs"],
    hook: "Walmart Global Tech and J.B. Hunt run legitimate engineering orgs 20 minutes from campus — the rare college town where you can bank Fortune-scale SWE experience before you graduate.",
    reality:
      "Big-tech interviews are standardized: data structures, systems, and a resume that shows shipped code. A campus IT job proves reliability; a research lab proves depth; an NWA internship proves scale. Do side projects in public (GitHub), grind a hundred LeetCode problems junior year, and remember Walmart Tech's return-offer rate makes it the highest-probability door in the region.",
    employerMatch: ["Walmart", "J.B. Hunt", "Movista", "Field Agent", "ArcBest"],
    ladder: [
      { when: "Year 1", what: "Join ACM/IEEE; take an IT or help-desk campus job; ship one personal project that isn't a tutorial.", links: [{ label: "EECS listings", href: "/jobs?major=eecs" }, { label: "EECS clubs", href: "/clubs?major=eecs" }] },
      { when: "Year 2", what: "Email two labs (CVIU, SAIL, AHPCC) for research hours — undergrad research reads as engineering experience. Target a first internship at a smaller NWA shop like Movista or Field Agent.", links: [{ label: "EECS labs", href: "/labs?major=eecs" }] },
      { when: "Year 3", what: "Walmart Global Tech / J.B. Hunt engineering internship summer. Apply in early fall; referrals from the Connect board move applications out of the pile.", links: [{ label: "NWA tech programs", href: "/jobs?where=nwa&major=eecs" }, { label: "Connect", href: "/connect" }] },
      { when: "Year 4", what: "Convert the return offer, or use it as leverage in big-tech loops — 'built systems serving Fortune-1 traffic' is a sentence interviewers remember." },
    ],
  },
  {
    slug: "data-ml",
    name: "Data & Machine Learning",
    role: "Data scientist / ML engineer",
    majors: ["eecs", "business", "physical-sciences"],
    hook: "Retail and logistics are applied-ML goldmines: forecasting, routing, pricing. NWA generates that data at world scale, and campus labs publish on it.",
    reality:
      "Data roles reward proof over pedigree: a research poster, a Kaggle finish, or a dashboard a department actually uses beats coursework. Stats and linear algebra matter more than any framework. The AHPCC supercomputer and data-heavy labs (Wu, Monroe) are on-campus credibility; supply-chain analytics internships are the regional specialty.",
    employerMatch: ["Walmart", "J.B. Hunt", "Field Agent", "Tyson"],
    ladder: [
      { when: "Year 1", what: "Stats + Python early; join the data/AI student groups; grade or tutor for the math department.", links: [{ label: "Clubs", href: "/clubs?major=eecs" }] },
      { when: "Year 2", what: "Research assistant in a data-driven lab — signal processing, simulation, imaging. Ask AHPCC about student roles; cluster experience is rare and loud on a resume.", links: [{ label: "Labs", href: "/labs?major=eecs" }] },
      { when: "Year 3", what: "Data science / supply-chain analytics internship at Walmart, J.B. Hunt, or Tyson. Bring one deployed project to the interview.", links: [{ label: "NWA programs", href: "/jobs?where=nwa" }] },
      { when: "Year 4", what: "Senior thesis or published poster + return offer. Grad school is optional; a portfolio isn't." },
    ],
  },
  {
    slug: "semiconductors",
    name: "Chips & Hardware",
    role: "Semiconductor / hardware design engineer",
    majors: ["eecs", "physical-sciences"],
    hook: "Quietly, Fayetteville is a power-electronics and chip-design hub: MSCAD, NCREPT, HiDEC's cleanroom, and an actual semiconductor company at the research park.",
    reality:
      "Hardware careers are apprenticeship-shaped: tape-outs, lab hours, and cleanroom time can't be self-taught. UofA's power-electronics cluster (Mantooth's MSCAD, NCREPT, GRAPES) is nationally known, and Ozark IC hires students for extreme-environment chip work next door. This is the track where staying close to professors pays the most.",
    employerMatch: ["Ozark IC", "Garver"],
    ladder: [
      { when: "Year 1", what: "Circuits fundamentals + IEEE; get any lab-adjacent campus job to learn bench discipline.", links: [{ label: "EECS clubs", href: "/clubs?major=eecs" }] },
      { when: "Year 2", what: "Email MSCAD, TruLogic, or the Optoelectronics lab — power electronics groups here take undergrads seriously. Ask HiDEC about cleanroom training.", links: [{ label: "Hardware labs", href: "/labs?major=eecs" }] },
      { when: "Year 3", what: "Ozark IC internship at the research park, or a national lab / defense internship using your professor's network — that's how those doors open.", links: [{ label: "NWA programs", href: "/jobs?where=nwa&major=eecs" }] },
      { when: "Year 4", what: "Senior design with your lab; decide between industry (Texas Instruments, onsemi recruit power people) and a funded MS — in this field the MS often pays for itself." },
    ],
  },
  {
    slug: "supply-chain",
    name: "Supply Chain Leadership",
    role: "Supply chain / operations leader",
    majors: ["business", "mech-civil-ind"],
    hook: "This is the one field where Fayetteville IS the coast: the world's supply-chain capital runs on I-49, and Walton's SCM program feeds it directly.",
    reality:
      "No region on earth offers a shorter path from classroom to world-scale operations. Walmart, J.B. Hunt, Tyson, ArcBest and 1,300 supplier offices hire SCM interns every summer, and the university's transportation research centers (MarTREC, Mack-Blackwell) pay students to study freight. The differentiators are data skills (SQL, Excel, a BI tool) and one internship that touched a real network.",
    employerMatch: ["Walmart", "J.B. Hunt", "Tyson", "ArcBest", "Simmons"],
    ladder: [
      { when: "Year 1", what: "Join Walton's supply-chain orgs; work any operations-flavored campus job — transit, logistics, events.", links: [{ label: "Business clubs", href: "/clubs?major=business" }] },
      { when: "Year 2", what: "Research hours at MarTREC or Mack-Blackwell; first internship at a supplier office or Simmons.", links: [{ label: "Transport labs", href: "/labs?major=mech-civil-ind" }] },
      { when: "Year 3", what: "The big one: Walmart, J.B. Hunt, or Tyson supply-chain internship. NWA return offers here become national currency.", links: [{ label: "NWA programs", href: "/jobs?where=nwa&major=business" }] },
      { when: "Year 4", what: "Convert, then choose your specialty — transportation, sourcing, planning, or supply-chain tech." },
    ],
  },
  {
    slug: "med-school",
    name: "Medicine & Health",
    role: "Physician, PA, dentist, or clinical researcher",
    majors: ["life-sciences", "biomed-chem", "health-education"],
    hook: "Med schools count hours: clinical, research, service. Fayetteville lets you bank all three — hospital shifts, funded labs doing CRISPR and imaging, and a campus full of volunteering.",
    reality:
      "Admissions committees read a transcript, an MCAT, and a story told in hours: ~150+ clinical, sustained research, real service. Washington Regional is the clinical anchor (patient care tech and CNA shifts count fully); BMEG and biology labs here publish with undergrads on the paper. Start the research relationship sophomore year — a four-semester lab arc with one professor beats four one-semester stints.",
    employerMatch: ["Washington Regional"],
    ladder: [
      { when: "Year 1", what: "Pre-health advising + AED; get CNA/PCT certified the summer after freshman year.", links: [{ label: "Health clubs", href: "/clubs?major=life-sciences" }] },
      { when: "Year 2", what: "Email two labs — Quinn, Nelson, stem-cell, or a biology lab. Volunteer weekly, not occasionally.", links: [{ label: "Bio & med labs", href: "/labs?major=life-sciences" }] },
      { when: "Year 3", what: "Clinical hours at Washington Regional while your lab work deepens into a poster or thesis. MCAT the summer before senior year.", links: [{ label: "Clinical listings", href: "/jobs?major=life-sciences" }] },
      { when: "Year 4", what: "Apply with hours that tell one coherent story. A professor who's watched you for three years writes the letter that matters." },
    ],
  },
  {
    slug: "research-phd",
    name: "Research & Grad School",
    role: "PhD student → scientist, professor, or R&D",
    majors: ["physical-sciences", "life-sciences", "biomed-chem", "eecs", "social-sciences"],
    hook: "Funded PhDs go to students with research history and strong letters. Both are manufactured the same way: years in a lab, starting now.",
    reality:
      "PhD admissions are an apprenticeship market — your application is your letters, and letters come from professors who know your work. The Honors College will literally fund your research; every lab in this directory is a potential home. Aim for: two-plus years in one lab, a conference poster, and an REU (paid summer research at another university) after sophomore or junior year.",
    employerMatch: [],
    ladder: [
      { when: "Year 1", what: "Read three lab pages in your field; email one professor with the composer. Volunteer hours are fine — you're buying mentorship.", links: [{ label: "All labs", href: "/labs" }] },
      { when: "Year 2", what: "Formalize: hourly RA or Honors research grant. Apply to summer REUs nationally — they're paid and they're how committees see range.", links: [{ label: "Research programs", href: "/jobs?where=research" }] },
      { when: "Year 3", what: "Present at a conference; take the grad courses your PI suggests; start the GRE only if your target programs still want it." },
      { when: "Year 4", what: "Apply to programs where your lab's collaborators are — warm networks decide close calls. Your PI's phone call is worth more than any test score." },
    ],
  },
  {
    slug: "startup-founder",
    name: "Startups & Product",
    role: "Founder or early-stage product builder",
    majors: ["business", "eecs", "arts-humanities"],
    hook: "NWA is flush with startup capital and short on builders. McMillon Studio, Startup Junkie, and the research park form a real pipeline — while you're still enrolled.",
    reality:
      "The regional ecosystem (Startup Junkie's free consulting, McMillon's design teams, ARTP's deep-tech companies) means you can ship, pitch, and even raise here without moving. The honest play: join a McMillon team freshman year, intern inside one startup to see the machinery, then launch with a cofounder you met doing both. Retail-tech ideas have unfair advantages in this metro — pilot customers are everywhere.",
    employerMatch: ["Startup Junkie", "Movista", "Field Agent", "Ozark IC"],
    ladder: [
      { when: "Year 1", what: "Join a McMillon design team — it's the campus's founder farm system.", links: [{ label: "Campus programs", href: "/jobs?where=on-campus" }] },
      { when: "Year 2", what: "Intern at a local startup (Field Agent, Movista) to watch product decisions up close.", links: [{ label: "NWA startups", href: "/jobs?where=nwa" }] },
      { when: "Year 3", what: "Advance to a McMillon product team or launch: Startup Junkie's consulting is free and the pitch-competition circuit funds first builds.", links: [{ label: "Connect", href: "/connect" }] },
      { when: "Year 4", what: "Go full-time on the company, or take a product role at a growth-stage startup with your portfolio of shipped things." },
    ],
  },
  {
    slug: "food-ag-industry",
    name: "Food & Ag Industry",
    role: "Food scientist, ag business, or protein-industry leader",
    majors: ["ag-food", "life-sciences", "business"],
    hook: "The protein capital of America is a 15-minute drive: Tyson, Simmons, George's. Bumpers students walk into an industry that headquarters here.",
    reality:
      "Food science and poultry science at UofA carry unusual weight because the employers sit next door and fund the departments. The clubs are professional networks in miniature — industry judges the poultry judging team. Two summers inside Tyson or Simmons plus a product-development project makes you a day-one hire; the Rhoads lab bridges genomics and industry if you lean research.",
    employerMatch: ["Tyson", "Simmons", "George"],
    ladder: [
      { when: "Year 1", what: "Poultry Science Club / Food Science Club — the industry mixers alone justify dues.", links: [{ label: "Ag clubs", href: "/clubs?major=ag-food" }] },
      { when: "Year 2", what: "First internship: Simmons and George's hire earlier-year students more readily than the giants.", links: [{ label: "Ag programs", href: "/jobs?where=nwa&major=ag-food" }] },
      { when: "Year 3", what: "Tyson internship — food safety, R&D, ops, or ag services. Research hours in a Bumpers or Rhoads-style lab if R&D calls to you.", links: [{ label: "Ag labs", href: "/labs?major=ag-food" }] },
      { when: "Year 4", what: "Convert to a rotational program, or stack a food-science MS the industry will often pay for." },
    ],
  },
];

export const TRACK_BY_SLUG = new Map(TRACKS.map((t) => [t.slug, t]));
