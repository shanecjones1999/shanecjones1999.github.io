export type LoadedPr = {
  lift: string;
  /** Heaviest set weight (lb) */
  weight: number;
  reps: number;
  date: string;
  /** Epley estimated 1RM from that set */
  e1rm: number;
  note?: string;
};

export type BodyweightPr = {
  lift: string;
  /** Max added load (lb) */
  addedWeight: number;
  reps: number;
  date: string;
  /** Best bodyweight-only set */
  bwReps: number;
};

/**
 * PRs across all Lift Tracking sheets.
 * Loaded lifts: heaviest set (weight, then reps).
 * Pull-ups / dips: max added weight; BW max reps noted separately.
 *
 * Included names — squats: Squats / Squat / Squats (belt);
 * split squats: Split squats (+ Bulgarian / single KB variants);
 * pull-ups: Pull ups / Pull-ups / Neutral grip (excl. assisted);
 * deadlifts: Deadlifts / Hex / Trap (excl. RDLs);
 * bench: Bench press / Pause / no legs (excl. incline / DB / machine);
 * dips: Dips (excl. assisted).
 */
export const loadedPrs: LoadedPr[] = [
  {
    lift: "Squats",
    weight: 385,
    reps: 1,
    date: "2025-05-08",
    e1rm: 385,
  },
  {
    lift: "Deadlifts",
    weight: 385,
    reps: 3,
    date: "2025-05-03",
    e1rm: 423.5,
  },
  {
    lift: "Bench press",
    weight: 245,
    reps: 4,
    date: "2026-03-22",
    e1rm: 277.7,
  },
  {
    lift: "Split squats",
    weight: 100,
    reps: 12,
    date: "2024-08-19",
    e1rm: 140,
    note: "single kettlebell",
  },
];

export const bodyweightPrs: BodyweightPr[] = [
  {
    lift: "Dips",
    addedWeight: 55,
    reps: 7,
    date: "2024-08-21",
    bwReps: 20,
  },
  {
    lift: "Pull ups",
    addedWeight: 45,
    reps: 5,
    date: "2026-07-17",
    bwReps: 16,
  },
];
