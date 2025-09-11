import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/app/user-info';
import { LogOut, Settings } from 'lucide-react';
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";

interface UserMenuContentProps {
    authViewModel: AuthViewModel | null;
}

export function UserMenuContent({ authViewModel }: UserMenuContentProps) {
    // const cleanup = useMobileNavigation();

    // const handleLogout = () => {
    //     cleanup();
    //     router.flushAll();
    // };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo authViewModel={authViewModel} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <div>
                        <Settings className="mr-2" />
                        Settings
                    </div>
                    {/* <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link> */}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <div>
                    <LogOut className="mr-2" />
                    Log out
                </div>
                {/* <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link> */}
            </DropdownMenuItem>
        </>
    );
}
