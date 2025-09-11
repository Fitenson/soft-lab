import { z } from "zod";
import LoginFormField from "@/pages/auth/presentation/form/LoginFormField";


export const loginSchema = z.object({
    username: z.string().max(LoginFormField.username.max, { error: LoginFormField.username.maxError }),
    password: z.string().min(LoginFormField.password.min ?? 1, { error: LoginFormField.password.minError }).max(LoginFormField.password.max, { error: LoginFormField.password.maxError } )
});


export type LoginModel = z.infer<typeof loginSchema>;
