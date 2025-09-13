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
}) {
    const max = options.max ?? 255;
    const min = options.min ?? 0;

    return {
        ...options,
        max,
        min,
        maxError: options.max ? `${options.label} cannot exceed ${options.max} characters` : undefined,
        minError: options.min ? `${options.label} must be at least ${options.min} characters` : undefined,
    };
}
