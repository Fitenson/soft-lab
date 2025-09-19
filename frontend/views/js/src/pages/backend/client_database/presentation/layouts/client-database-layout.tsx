import type { PropsWithChildren } from "react";


export default function ClientDatabaseLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-4 py-6 w-full mx-auto">
            <section className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12 w-full">
                {children}
            </section>
        </div>
    );
}
