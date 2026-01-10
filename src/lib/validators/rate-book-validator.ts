import { z } from "zod";

export const rateBookValidator = z.object({
  rating: z.number().int().min(0).max(5).optional(),
  olid: z.string(),
});

export const deleteBookRatingValidator = z.object({
  olid: z.string(),
  action: z.enum(["delete"]),
});
