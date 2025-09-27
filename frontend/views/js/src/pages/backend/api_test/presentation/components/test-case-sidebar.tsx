import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
// import type { DataTableType } from "@/types";
// import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import "@/pages/backend/api_test/presentation/index.css";
import type { TreeNode } from "@/pages/backend/api_test/presentation/redux/tree-view-slice.ts";
import TreeView from "./tree-view";

// type TestCaseSidebarProps = {
//     data: DataTableType<ApiTestViewModel>;
//     refetch: () => void;
// }


export default function TestCaseSidebar() {
    const mockTree: TreeNode[] = [
        {
            UUID: "1",
            title: "Authentication",
            isFolder: true,
            apiTests: [
                { 
                    UUID: "2",
                    title: "Login",
                    isFolder: true,
                    apiTests: [
                        { 
                            UUID: "3",
                            title: "Login As Admin",
                            isFolder: false,
                        },
                        { 
                            UUID: "4",
                            title: "Login As Normal User",
                            isFolder: false,
                        },
                    ]
                },
                { 
                    UUID: "5",
                    title: "Login",
                    isFolder: false,
                },
            ],
        },
        {
            UUID: "6",
            title: "User",
            isFolder: true,
            apiTests: [
                { 
                    UUID: "7",
                    title: "Check normal Index",
                    isFolder: false,
                },
                { 
                    UUID: "8",
                    title: "Check filter Index",
                    isFolder: false,
                },
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

            {mockTree.map((node) => (
                <TreeView key={node.UUID} node={node} />
            ))}
        </div>
    );
}
