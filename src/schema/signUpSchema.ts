import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string()
        .min(3, { message: "username must contain atleast 3 characters" })
        .max(20, { message: "username can only contain maximum of 20 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "password must contain atleast 6 characters" })
})