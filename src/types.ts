import { z } from "zod";

export const Person = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  age: z.number().nullable(),
  created_at: z.string(),
});
