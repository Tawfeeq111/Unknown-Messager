import { z } from "zod";

export const messageSchema = z.object({
    content: z.string()
        .min(3, { message: "message must contain atleast 3 characters" })
        .max(300, { message: "username can only contain maximum of 300 characters" }),
}) 