import React from "react";


export default function ApiTestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full ">
            {children}
        </div>
    );
}
