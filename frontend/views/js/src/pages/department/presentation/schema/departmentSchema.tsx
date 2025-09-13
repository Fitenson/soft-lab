import { z } from "zod"

import DepartmentFormField from "@/pages/department/presentation/form/DepartmentFormField.ts";


export const departmentSchema = z.object({
    departmentID: z.string().max(DepartmentFormField.departmentID.max, { error: DepartmentFormField.departmentID.maxError }),
    departmentName: z.string().max(DepartmentFormField.departmentName.max, { error: DepartmentFormField.departmentName.maxError }),
    description: z.string().max(DepartmentFormField.description.max, { error: DepartmentFormField.description.maxError }).nullable(),
    head: z.string().nullable(),
    headDepartmentName: z.string().nullable(),

    // profileImage: z
    // .any()
    // .refine((file) => file instanceof File, { error: DepartmentFormField.profileImage.maxError })
    // .refine((file) => !file || file.size <= 10 * 1024 * 1024, { error: DepartmentFormField.profileImage.maxError })
    // .nullable(),
});


export type DepartmentFormModel = z.infer<typeof departmentSchema>;
