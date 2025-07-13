import {z} from "zod";

export const CreateUserSchema = z.object({
    full_name: z.string(),
    username: z.string().min(3).max(20),
    password: z.string()
})

export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string()
})

export const  CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})