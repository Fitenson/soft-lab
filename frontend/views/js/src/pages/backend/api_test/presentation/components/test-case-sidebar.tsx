import { Button } from "@/components/ui/button.tsx";
import { FaPlus } from "react-icons/fa";
import TreeView from "./tree-view";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { addApiTest } from "@/pages/backend/api_test/presentation/redux/apiTestSlice.ts";
import { toggleSelectedApiTest, triggerMenuAction } from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel";
import { uuid } from "@/lib/utils";
import { selectApiTests } from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import { setSelectedApiTest } from "../redux/apiTestUISlice";
import type { ApiTestDTO } from "../../data/dto/ApiTestDTO";
import {useEffect} from "react";


export default function TestCaseSidebar() {
    const apiTests = useAppSelector(selectApiTests);
    const dispatch = useDispatch();


    const handleSelectAddTestCaseFile = () => {
        const apiTestDTO: Partial<ApiTestDTO> = { UUID: uuid(), isFolder: 0, testName: "New Test Case" };
        dispatch(addApiTest(apiTestDTO));
        dispatch(setSelectedApiTest(apiTestDTO));
        dispatch(toggleSelectedApiTest(apiTestDTO));
        dispatch(triggerMenuAction({ action: "rename", dto: apiTestDTO }));
    }

    useEffect(() => {
        console.log(apiTests);
    }, [apiTests]);


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
                            onClick={handleSelectAddTestCaseFile}
                        >
                            Add Test Case
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {apiTests.rows.map((node) => {
                const apiTestViewModel = new ApiTestViewModel(node);

                return (
                    <TreeView key={apiTestViewModel.UUID} node={apiTestViewModel} />
                );
            })}
        </div>
    );
}
