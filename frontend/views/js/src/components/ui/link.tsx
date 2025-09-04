import type { ReactNode } from "react";
import { Link as InertiaLink } from "@inertiajs/react";
import { cn } from "@/lib/utils";

type LinkProps = {
    to: string;
    className?: string;
    children: ReactNode
}


export default function Link ({
    to,
    className,
    children
}: LinkProps) {
    return (
        <InertiaLink 
            href={to}
            className={cn(
                "text-primary hover:underline transition-colors duration-200",
                className
            )}
        >
            {children}
        </InertiaLink>
    );
}
