import { z } from "zod";

export const markReadValidator = z.object({
  date: z
    .string()
    .nullable()
    .transform((val) => {
      if (val) return new Date(val).toISOString();
      return null;
    }),
  olid: z.string(),
});

export const undoMarkReadValidator = z.object({
  olid: z.string(),
  action: z.enum(["mark-unread"]),
});
