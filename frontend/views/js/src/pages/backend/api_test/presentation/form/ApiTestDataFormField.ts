import { createFormField } from "@/lib/utils.ts";


const ApiTestDataFormField = {
    enabled: createFormField({ name: "enabled", label: "Enabled" }),
    key: createFormField({ name: "key", label: "Key", max: 100 }),
    value: createFormField({ name: "value", label: "Value" }),
    description: createFormField({ name: "description", label: "Description", max: 500 }),
    fieldType: createFormField({ name: "fieldType", label: "Field Type", max: 100 }),
    isNew: createFormField({ name: "isNew", label: "Is New" }),
};


export default ApiTestDataFormField;
