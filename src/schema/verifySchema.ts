import { z } from "zod"

export const verifySchema = z.object({
    code: z.string().length(6, {message: "Verification code must contain 6 digits"})
})