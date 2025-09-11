import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthViewModel from '@/pages/auth/presentation/view_models/AuthViewModel';


interface UserInfoProps {
    authViewModel: AuthViewModel | null
}


export function UserInfo({ authViewModel }: UserInfoProps) {
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={authViewModel?.profileImage} alt={authViewModel?.username} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {authViewModel?.fullName}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{authViewModel?.fullName}</span>
                <span className="truncate text-xs text-muted-foreground">{authViewModel?.email}</span>
            </div>
        </>
    );
}
