import type { PropsWithChildren } from "react";


export default function ApiTestLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-1 py-2 w-full h-full mx-1 flex flex-col overflow-y-hidden">{children}</div>
    );
}
