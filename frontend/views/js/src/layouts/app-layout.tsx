import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from "@/layouts/app-sidebar-layout";


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[]
}


export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
