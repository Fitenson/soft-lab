import { createFormField } from "@/lib/utils.ts";


const ProjectFormField = {
    projectCode: createFormField({ name: "projectCode", label: "Project Code", max: 50 }),
    projectName: createFormField({ name: "projectName", label: "Project Name", max: 100 }),
    description: createFormField({ name: "description", label: "Description", max: 500 }),
    secondDescription: createFormField({ name: "secondDescription", label: "2nd Description", max: 750 }),
    moreDescription: createFormField({ name: "moreDescription", label: "More Description", max: 1000 }),
};


export default ProjectFormField;
