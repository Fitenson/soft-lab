import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function createFormField<Name extends string>(options: {
    name: Name,
    label: string,
    max?: number,
    min?: number,
    emailFormatError?: string,
}) {
    const max = options.max ?? 255;
    const min = options.min ?? 0;

    return {
        ...options,
        max,
        min,
        maxError: options.max ? `${options.label} cannot exceed ${options.max} characters` : undefined,
        minError: options.min ? `${options.label} must be at least ${options.min} characters` : undefined,
        emailFormatError: options.emailFormatError ? options.emailFormatError : undefined,
    };
}


export function buildFormData<T extends object>(
    data: T | T[],
    allowedKeys?: (keyof T)[],
    formData: FormData = new FormData(),
    parentKey?: string
): FormData {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            const keyPrefix = parentKey ? `${parentKey}[${index}]` : String(index);
            buildFormData(item, allowedKeys, formData, keyPrefix);
        });
        return formData;
    }

    // Handle object case
    const keys = allowedKeys ?? (Object.keys(data) as (keyof T)[]);

    for (const key of keys) {
        const value = data[key];
        if (value === undefined || value === null) continue;

        const formKey = parentKey ? `${parentKey}[${String(key)}]` : String(key);

        if (Array.isArray(value) || (typeof value === "object" && !(value instanceof File))) {
            buildFormData(value as never, undefined, formData, formKey);
        } else {
            formData.append(formKey, value instanceof File ? value : String(value));
        }
    }

    return formData;
}


export function uuid() {
    return uuidv4();
}
