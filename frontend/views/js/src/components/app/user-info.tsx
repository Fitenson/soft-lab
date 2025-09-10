import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Auth from '@/pages/auth/domain/entity/AuthEntity';


interface UserInfoProps {
    user: Auth | null
}


export function UserInfo({ user }: UserInfoProps) {
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.getProfileImage()} alt={user?.getFullName()} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {user?.getFullName()}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.getFullName()}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.getEmail()}</span>
            </div>
        </>
    );
}
