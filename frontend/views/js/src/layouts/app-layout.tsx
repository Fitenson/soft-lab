import type { ReactNode } from "react";


interface AppLayoutProps {
    children: ReactNode
}


export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="max-w-full max-h-full">{children}</main>
    );
}
