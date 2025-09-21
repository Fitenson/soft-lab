import type { PropsWithChildren } from "react";


export default function UserLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12 px-4 py-6 w-full h-full mx-auto">
            {children}
        </div>
    );
}
