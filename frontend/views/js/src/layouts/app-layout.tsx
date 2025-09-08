import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/types";


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem
}


export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="max-w-full max-h-full">{children}</main>
    );
}
