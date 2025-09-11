import { z } from "zod";
import RegisterFormField from "@/pages/auth/presentation/form/RegisterFormField";


export const registerSchema = z.object({
    fullName: z.string().max(RegisterFormField.fullName.max, { error: RegisterFormField.fullName.maxError }),
    username: z.string().max(RegisterFormField.username.max, { error: RegisterFormField.username.maxError }),
    email: z.string().max(RegisterFormField.email.max, { error: RegisterFormField.email.maxError}),
    password: z.string().min(RegisterFormField.password.min ?? 1, RegisterFormField.password.minError).max(RegisterFormField.password.max, RegisterFormField.password.maxError)
});


export type RegisterModel = z.infer<typeof registerSchema>;
