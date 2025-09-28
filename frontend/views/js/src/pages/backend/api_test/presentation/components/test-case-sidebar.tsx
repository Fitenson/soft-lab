import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
// import type { DataTableType } from "@/types";
// import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import TreeView from "./tree-view";
import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";

// type TestCaseSidebarProps = {
//     data: DataTableType<ApiTestViewModel>;
//     refetch: () => void;
// }


export default function TestCaseSidebar() {
    return (
        <div className="flex flex-col h-full border-r bg-muted/30 p-2 rounded-2xl">
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

            {mockTree.map((node) => (
                <TreeView key={node.UUID} node={node} />
            ))}
        </div>
    );
}
