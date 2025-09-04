import ModeToggleTab from "@/components/ui/mode-toggle-tab";
import type { ReactNode } from "react";


type AuthLayoutProps = {
    children: ReactNode
}


const AuthLayout = ({ children}: AuthLayoutProps) => {
    return (
        <main className="bg-background dark:bg-background w-full h-full flex flex-col overflow-x-hidden">
            <div className="absolute top-4 right-4">
                <ModeToggleTab/>
            </div>
            <div>
                {children}
            </div>
        </main>
    );
}


export default AuthLayout;
