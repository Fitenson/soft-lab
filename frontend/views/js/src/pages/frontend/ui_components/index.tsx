import AppLayout from "@/layouts/app-layout.tsx";
import {Head} from "@inertiajs/react";
import UIComponentLayout from "@/pages/frontend/ui_components/presentation/layouts/ui-component-layout.tsx";


export default function UIComponentsIndex() {
    return (
        <AppLayout>
            <Head title="UI Components" />

            <UIComponentLayout>
                <section className="w-full mx-auto"></section>
            </UIComponentLayout>
        </AppLayout>
    );
}
