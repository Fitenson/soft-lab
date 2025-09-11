import { z } from "zod"

import UserFormField from "@/pages/user/presentation/form/UserFormField.ts";


export const userSchema = z.object({
    fullName: z.string().max(UserFormField.fullName.max, { error: UserFormField.fullName.maxError }),
    username: z.string().max(UserFormField.username.max, { error: UserFormField.username.maxError }),
    email: z.string().max(UserFormField.address.max, { error: UserFormField.address.maxError }),
    description: z.string().max(UserFormField.description.max, { error: UserFormField.description.maxError }).nullable(),
    address: z.string().max(UserFormField.address.max, { error: UserFormField.address.maxError }).nullable(),
    gender: z.string().max(UserFormField.gender.max, { error: UserFormField.gender.maxError }).nullable(),
    title: z.string().max(UserFormField.title.max, { error: UserFormField.title.maxError }).nullable(),
});


export type UserFormModel = z.infer<typeof userSchema>;
