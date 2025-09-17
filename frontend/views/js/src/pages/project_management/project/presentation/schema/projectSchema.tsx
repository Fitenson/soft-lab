import { z } from "zod";
import ProjectFormField from "@/pages/project_management/project/presentation/form/ProjectFormField.ts";


export const projectSchema = z.object({
    projectCode: z.string().max(ProjectFormField.projectCode.max, { error: ProjectFormField.projectCode.maxError}),
    projectName: z.string().max(ProjectFormField.projectName.max, { error: ProjectFormField.projectName.maxError }),
    description: z.string().max(ProjectFormField.description.max, { error: ProjectFormField.description.maxError }),
    secondDescription: z.string().max(ProjectFormField.secondDescription.max, { error: ProjectFormField.secondDescription.maxError }),
    moreDescription: z.string().max(ProjectFormField.moreDescription.max, { error: ProjectFormField.moreDescription.maxError }),
});


export type ProjectFormModel = z.infer<typeof projectSchema>;
