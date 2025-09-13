import { createFormField } from "@/lib/utils.ts";
import { CommonDataTableField } from "@/core/presentation/table/CommonField.tsx";


const DepartmentFormField = {
    departmentID: createFormField({ name: "departmentID", label: "Department ID", max: 100 }),
    departmentName: createFormField({ name: "departmentName", label: "Department Name", max: 100 }),
    head: createFormField({ name: "head", label: "" }),
    headDepartmentName: createFormField({ name: "headDepartmentName", label: "Head Department" }),
    description: createFormField({ name: "description", label: "Description", max: 1000 }),
    createdAtFormat: createFormField({ name: CommonDataTableField.createdAtFormat.name, label: CommonDataTableField.createdAtFormat.label }),
    createdByName: createFormField({ name: CommonDataTableField.createdByName.name, label: CommonDataTableField.createdByName.label }),
    updatedAtFormat: createFormField({ name: CommonDataTableField.updatedAtFormat.name, label: CommonDataTableField.updatedAtFormat.label }),
    updatedByName: createFormField({ name: CommonDataTableField.updatedByName.name, label: CommonDataTableField.updatedByName.label }),
};


export default DepartmentFormField;
