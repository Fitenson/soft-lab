export function buildFormData(
    data: Record<string, any>,
    formData: FormData = new FormData(),
    parentKey?: string
): FormData {
    for(const key in data) {
        if (data[key] === undefined || data[key] === null) continue;

        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        const value = data[key];
    }
};
