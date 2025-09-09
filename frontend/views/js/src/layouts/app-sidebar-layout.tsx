import { AppContent } from '@/components/app/app-content';
import { AppShell } from '@/components/app/app-shell';
import { AppSidebar } from '@/components/app/app-sidebar';
import { AppSidebarHeader } from '@/components/app/app-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BreadcrumbItem } from '@/types';
import { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { type PropsWithChildren } from 'react';


export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="flex flex-col overflow-x-hidden overflow-y-auto h-full">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <ScrollArea className="h-full w-full rounded-md border">
                    <ScrollAreaViewport>
                        <main className="flex-1">{children}</main>
                    </ScrollAreaViewport>

                    <ScrollAreaScrollbar
                        orientation="vertical"
                        className="bg-gray-200 w-2 rounded-full"
                    >
                        <ScrollAreaThumb className="bg-gray-400 rounded-full" />
                    </ScrollAreaScrollbar>

                    <ScrollAreaScrollbar
                        orientation="horizontal"
                        className="bg-gray-200 w-2 rounded-full"
                    >
                        <ScrollAreaThumb className="bg-gray-400 rounded-full" />
                    </ScrollAreaScrollbar>
                    <ScrollAreaCorner/>
                </ScrollArea>
            </AppContent>
        </AppShell>
    );
}
