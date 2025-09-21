import { AppContent } from '@/components/app/app-content';
import { AppShell } from '@/components/app/app-shell';
import { AppSidebar } from '@/components/app/app-sidebar';
import { AppSidebarHeader } from '@/components/app/app-sidebar-header';
// import { ScrollArea } from '@/components/ui/scroll-area';
import type { BreadcrumbItem } from '@/types';
// import { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { type PropsWithChildren } from 'react';


export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />

            <AppContent variant="sidebar" className="flex flex-col overflow-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="w-full h-full">{children}</main>
            </AppContent>
        </AppShell>
    );
}
