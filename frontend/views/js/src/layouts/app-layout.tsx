import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from "@/layouts/app-sidebar-layout";
import {useAppSelector} from "@/core/presentation/store/useAppSelector.ts";
import {router} from "@inertiajs/react";


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[]
}


export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const authViewModel = useAppSelector(state => state.auth.auth);

    if(!authViewModel) {
        router.visit("/");
    }


    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
