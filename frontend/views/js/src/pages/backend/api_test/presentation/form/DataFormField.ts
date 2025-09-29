import { createFormField } from "@/lib/utils.ts";


const DataFormField = {
    enabled: createFormField({ name: "enabled", label: "Enabled" }),
    key: createFormField({ name: "key", label: "Key" }),
    value: createFormField({ name: "value", label: "Value" }),
};


export default DataFormField;
