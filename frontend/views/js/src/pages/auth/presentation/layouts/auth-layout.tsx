import type { ReactNode } from "react";


type AuthLayoutProps = {
    children: ReactNode
}


const AuthLayout = ({ children}: AuthLayoutProps) => {
    return (
        <main className="relative max-w-full max-h-full overflow-x-hidden">{children}</main>
    );
}


export default AuthLayout;
