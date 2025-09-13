import type { LucideIcon } from 'lucide-react';
import type { IconType} from "react-icons";


export interface BreadcrumbItem {
    title: string;
    href: string;
}


export interface NavGroup {
    title: string;
    items: NavItem[];
}


export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | IconType | null;
    isActive?: boolean;
}


export interface Params {
    offset: string;
    limit: string;
    sort: string;
    order: "asc" | "desc";
}


export interface DataTableType<T> {
    total: string;
    rows: T[]
}


export interface FormFieldType {
    label: string;
    name: string;
    max?: number;
    maxError?: string;
    min?: number;
    minError?: string;
}


export type ApiErrors = Record<string, string | string[]>;