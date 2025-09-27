import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
// import type { DataTableType } from "@/types";
// import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
// import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from "react-complex-tree";


// type TestCaseSidebarProps = {
//     data: DataTableType<ApiTestViewModel>;
//     refetch: () => void;
// }


export default function TestCaseSidebar() {
    // const dataProvider = new StaticTreeDataProvider()

    const mockTree = [
        {
            UUID: "1",
            testName: "Auth",
            children: [
                { id: 2, name: "Login" },
                { id: 3, name: "Register" },
            ],
        },
        {
            UUID: "4",
            name: "Payments",
            children: [
                { id: 5, name: "Checkout" },
                { id: 6, name: "Refunds" },
            ],
        },
    ];


    return (
        <div className="col-span-2 flex flex-col h-full border-r bg-muted/30 p-2 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground">
                    Use Cases
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10"
                >
                    <FaPlus size={16} />
                </Button>
            </div>
        </div>
    );
}
