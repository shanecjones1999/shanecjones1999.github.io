export type SplitName = "push" | "pull" | "legs" | "misc";

export type GymTrackingStats = {
  /** Unique calendar days with at least one logged workout */
  totalGymDays: number;
  /** First → last logged workout (inclusive) */
  trackingStart: string;
  trackingEnd: string;
  trackingSpanDays: number;
  /** totalGymDays / trackingSpanDays */
  gymDayPercentage: number;
  /** Sessions by split (a calendar day can include more than one split) */
  splits: Record<SplitName, number>;
};

/**
 * Aggregated from every Lift Tracking tab (Legs / Legs 2 / Legs 3,
 * Pull / Pull 2 / Pull 3, Push / Push 2, Misc). Parsed from the full
 * spreadsheet export — not the truncated text preview.
 *
 * Per-sheet session counts: Legs 66, Legs 2 72, Legs 3 10,
 * Pull 51, Pull 2 64, Pull 3 2, Push 60, Push 2 54, Misc 42.
 */
export const gymTrackingStats: GymTrackingStats = {
  totalGymDays: 403,
  trackingStart: "2024-07-20",
  trackingEnd: "2026-08-25",
  trackingSpanDays: 767,
  gymDayPercentage: 52.5,
  splits: {
    legs: 148,
    pull: 117,
    push: 114,
    misc: 42,
  },
};

export const splitOrder: SplitName[] = ["legs", "pull", "push", "misc"];

export const splitLabels: Record<SplitName, string> = {
  legs: "Legs",
  pull: "Pull",
  push: "Push",
  misc: "Misc",
};
