import { NavFooter } from "@/components/app/nav-footer";
import { SidebarFooter } from "@/components/ui/sidebar";
import { NavMain } from "@/components/app/nav-main";
import { NavUser } from "@/components/app/nav-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, UserRound, BookOpenCheckIcon } from 'lucide-react';
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TbPuzzle } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'User',
        href: '/organization/user',
        icon: UserRound,
    },
    {
        title: 'Project Management',
        href: '/project_management',
        icon: GrProjects,
        subNavItems: [
            {
                title: 'Project',
                href: '/project_management/project',
                icon: FaProjectDiagram
            }
        ]
    },
    {
        title: 'Frontend',
        href: '/frontend',
        icon: HiOutlineDesktopComputer,
        subNavItems: [
            {
                title: 'UI Components',
                href: '/frontend/components',
                icon: TbPuzzle
            },
            {
                title: 'Utilities',
                href: '/frontend/utilities',
                icon: IoSettingsOutline
            }
        ]
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpenCheckIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
