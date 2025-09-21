import type { PropsWithChildren } from "react";


export default function ClientDatabaseLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-4 py-6 w-full h-full mx-2 flex flex-col overflow-y-hidden">{children}</div>
    );
}
