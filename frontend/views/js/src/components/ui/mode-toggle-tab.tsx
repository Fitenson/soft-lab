import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useTheme } from "./theme/useTheme";
import type { Theme } from "./theme/ThemeProvider";


const ModeToggleTab = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { theme, setTheme } = useTheme();

    const tabs: { value: Theme, icon: LucideIcon, label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' }
    ];


    return(
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => {
                const isActive = theme === value;

                return (
                    <Button
                        key={value}
                        onClick={() => setTheme(value)}
                        variant={isActive ? 'default' : 'ghost'}
                        className={cn(
                            'flex items-center rounded-md transition-colors',
                            isActive ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        )}
                    >
                        <Icon className='-m-1 h-4 w-4' />
                        <span className='ml-1.5 text-sm'>{label}</span>
                    </Button>
                )
            })}
        </div>
    );
}


export default ModeToggleTab;
