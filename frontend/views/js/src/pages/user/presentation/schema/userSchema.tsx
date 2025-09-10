import z from "zod"

import UserFormField from "@/pages/user/presentation/form/UserFormField";


export const userSchema = z.object({
    fullName: z.string().max(UserFormField.fields().fullName.max, { error: UserFormField.fullNameMaxError}),
    username: z.string().max(UserFormField.fields().username.max, { error: UserFormField.usernameMaxError}),
    email: z.string().max(UserFormField.fields().email.max, { error: UserFormField.addressMaxError }),
    description: z.string().max(UserFormField.fields().description.max, { error: UserFormField.descriptionMaxError }).nullable(),
    address: z.string().max(UserFormField.fields().address.max, { error: UserFormField.addressMaxError })
});


export type UserForm = z.infer<typeof userSchema>;
