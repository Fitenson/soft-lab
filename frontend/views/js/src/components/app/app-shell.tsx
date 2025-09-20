import { SidebarProvider } from '@/components/ui/sidebar';
import { useAppSelector } from '@/core/presentation/store/useAppSelector';


interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = useAppSelector(state => state.sidebar.isOpen);

    if (variant === 'header') {
        return <div className="flex overflow-hidden h-full w-full flex-col">{children}</div>;
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
