import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createFormField<Name extends string> (options: {
    name: Name,
    label: string,
    max: number,
    min?: number,
}) {
    return options;
}
