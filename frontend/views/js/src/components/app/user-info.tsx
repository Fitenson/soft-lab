import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/core/presentation/store/useAppSelector';


export function UserInfo() {
    const auth = useAppSelector(state => state.auth.auth);


    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={auth?.getProfileImage()} alt={auth?.getFullName()} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {auth?.getFullName()}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{auth?.getFullName()}</span>
                <span className="truncate text-xs text-muted-foreground">{auth?.getEmail()}</span>
            </div>
        </>
    );
}
