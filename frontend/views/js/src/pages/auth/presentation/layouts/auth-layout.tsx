import ModeToggleTab from "@/components/ui/mode-toggle-tab";
import type { ReactNode } from "react";


type AuthLayoutProps = {
    children: ReactNode
}


const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="bg-background dark:bg-background h-screen flex flex-col overflow-x-hidden">
            {/* Theme toggle button */}
            <div className="absolute top-4 right-4">
                <ModeToggleTab />
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col justify-center items-center">
                {children}
            </div>

            {/* Footer pinned at bottom */}
            <footer className="py-6 text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </main>
    );
};


export default AuthLayout;
