export const CATEGORY = {
  MAKHRAJ: "makhraj",
  SIFAT: "sifat",
  AHKAM: "ahkam",
  MAD: "mad",
  GHARIB: "gharib",
  KELANCARAN: "kelancaran",
} as const;

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];
