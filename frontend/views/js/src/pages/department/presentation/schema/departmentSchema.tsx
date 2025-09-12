import { z } from "zod"

import UserFormField from "@/pages/user/presentation/form/UserFormField.ts";


export const departmentSchema = z.object({
    fullName: z.string().max(UserFormField.fullName.max, { error: UserFormField.fullName.maxError }),
    username: z.string().max(UserFormField.username.max, { error: UserFormField.username.maxError }),
    email: z.string().max(UserFormField.address.max, { error: UserFormField.address.maxError }),
    description: z.string().max(UserFormField.description.max, { error: UserFormField.description.maxError }).nullable(),
    address: z.string().max(UserFormField.address.max, { error: UserFormField.address.maxError }).nullable(),
    gender: z.string().max(UserFormField.gender.max, { error: UserFormField.gender.maxError }).nullable(),
    title: z.string().max(UserFormField.title.max, { error: UserFormField.title.maxError }).nullable(),
    role: z.string().max(UserFormField.role.max, { error: UserFormField.role.maxError }).nullable(),
    phoneNo: z.string().max(UserFormField.phoneNo.max, { error: UserFormField.phoneNo.maxError }).nullable(),
    department: z.string().max(UserFormField.department.max, { error: UserFormField.department.maxError }).nullable(),

    // profileImage: z
    // .any()
    // .refine((file) => file instanceof File, { error: UserFormField.profileImage.maxError })
    // .refine((file) => !file || file.size <= 10 * 1024 * 1024, { error: UserFormField.profileImage.maxError })
    // .nullable(),
});


export type UserFormModel = z.infer<typeof departmentSchema>;
