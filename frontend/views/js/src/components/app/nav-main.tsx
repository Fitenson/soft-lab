import React, { Fragment } from "react";
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from "lucide-react";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';


export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const [openItems, setOpenItems] = React.useState<string[]>([]);

    const toggleItem = (title: string) => {
        setOpenItems((previous) => previous.includes(title) ? previous.filter((t) => t !== title) : [...previous, title]);
    }


    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isOpen = openItems.includes(item.title);

                    return (
                        <SidebarMenuItem key={item.title}>
                            {item.subNavItems && item.subNavItems.length > 0 ? (
                                <Fragment>
                                    <SidebarMenuButton
                                        onClick={() => toggleItem(item.title)}
                                        title={item.title}
                                        className="cursor-pointer"
                                    >
                                        {item.icon && <item.icon/>}
                                        <span>{item.title}</span>
                                        <ChevronRight className={`ml-auto h-4 w-4 transform transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                                    </SidebarMenuButton>

                                    <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
                                        <SidebarMenu>
                                            {item.subNavItems.map((subItem) => (
                                                <SidebarMenuItem key={subItem.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={page.url.startsWith(subItem.href)}
                                                        title={subItem.title}
                                                    >
                                                        <Link href={subItem.href} prefetch>
                                                            {subItem.icon && <subItem.icon className="ml-2 w-4 h-4" />}
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                ))}
                                                </SidebarMenu>
                                    </div>
                                </Fragment>
                            ) : (
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
