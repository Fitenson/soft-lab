import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from "@/components/app/user-info";
import { UserMenuContent } from "@/components/app/user-menu-content";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronsUpDown } from 'lucide-react';
import { useAppSelector } from '@/core/presentation/store/useAppSelector';


export function NavUser() {
    const authViewModel = useAppSelector(state => state.auth.authViewModel);
    const { state } = useSidebar();
    const isMobile = useIsMobile();


    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">
                            <UserInfo authViewModel={authViewModel} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <UserMenuContent authViewModel={authViewModel} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
