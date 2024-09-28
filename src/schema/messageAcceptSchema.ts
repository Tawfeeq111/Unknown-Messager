import { z } from "zod";

export const messageAcceptSchema = z.object({
    content: z.boolean()
}) 