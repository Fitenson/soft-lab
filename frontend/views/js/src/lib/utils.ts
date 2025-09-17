import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
    data: T,
    allowedKeys: (keyof T)[],
    formData: FormData = new FormData(),
    parentKey?: string
): FormData {
    const keys = (allowedKeys ?? (Object.keys(data) as (keyof T)[]));

    for(const key of keys) {
        const value = data[key];
        if (value === undefined || value === null) continue;
        const formKey = parentKey ? `${parentKey}[${String(key)}]` : String(key);

        formData.append(formKey, String(value));
    }

    return formData;
};
