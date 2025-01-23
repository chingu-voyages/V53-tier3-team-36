import { z } from "zod";

export const markUnWantToReadValidator = z.object({
  olid: z.string(),
  action: z.enum(["mark-undo-want-to-read"]),
});
