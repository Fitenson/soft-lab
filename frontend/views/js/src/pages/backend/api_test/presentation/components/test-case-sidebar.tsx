import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
import TreeView from "./tree-view";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { addApiTest } from "@/pages/backend/api_test/presentation/redux/apiTestSlice.ts";
import { toggleSelectedApiTest } from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel";
import { selectApiTests } from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";


export default function TestCaseSidebar() {
    const apiTests = useAppSelector(selectApiTests);
    const dispatch = useDispatch();


    const handleSelectDropdown = () => {
        const newApiTest = new ApiTestViewModel({ isFolder: 0, testName: "New Test Case" });
        dispatch(toggleSelectedApiTest(newApiTest));
        dispatch(addApiTest(newApiTest));
    }


    return (
        <div className="flex flex-col h-full border-r bg-muted/30 p-2 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground my-2">
                    Use Cases
                </h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary/10"
                        >
                            <FaPlus size={16} />
                        </Button>
                    </DropdownMenuTrigger >
                    <DropdownMenuContent>
                        <DropdownMenuItem 
                            className="cursor-pointer"
                        >
                            Add Test Case Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={handleSelectDropdown}
                        >
                            Add Test Case
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {apiTests.rows.map((node) => (
                <TreeView key={node.UUID} node={node} />
            ))}
        </div>
    );
}
