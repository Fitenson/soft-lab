import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
// import type { DataTableType } from "@/types";
// import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import "@/pages/backend/api_test/presentation/index.css";
import type { TreeNode } from "./tree-view";
import TreeView from "./tree-view";

// type TestCaseSidebarProps = {
//     data: DataTableType<ApiTestViewModel>;
//     refetch: () => void;
// }


export default function TestCaseSidebar() {
    const mockTree: TreeNode[] = [
        {
            UUID: "1",
            testName: "Authentication",
            useCase: "Login",
            isFolder: true,
            apiTests: [
                { 
                    UUID: "2",
                    testName: "Login",
                    useCase: "Login As Admin",
                    isFolder: true,
                    apiTests: [
                        { 
                            UUID: "3",
                            testName: "Login",
                            useCase: "Failed to login As Admin",
                            isFolder: false,
                        },
                        { 
                            UUID: "4",
                            testName: "Login",
                            useCase: "Login As Admin success",
                            isFolder: false,
                        },
                    ]
                },
                { 
                    UUID: "5",
                    testName: "Login",
                    useCase: "Login As Normal User",
                    isFolder: false,
                },
            ],
        },
        {
            UUID: "6",
            testName: "User",
            useCase: "Index",
            isFolder: true,
            apiTests: [
                { 
                    UUID: "7",
                    testName: "Check normal Index",
                    useCase: "Login As Admin",
                    isFolder: false,
                },
                { 
                    UUID: "8",
                    testName: "Check filter Index",
                    useCase: "Login As Normal User",
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
