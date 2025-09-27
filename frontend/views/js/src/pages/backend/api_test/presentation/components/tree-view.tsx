import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react";
import { useState } from "react";


export type TreeNode = {
    UUID: string;
    testName: string;
    useCase: string;
    isFolder: boolean;
    apiTests?: TreeNode[]
};


export default function TreeView({ node, level = 0 }: { node: TreeNode, level?: number}) {
    const [expanded, setExpanded] = useState(false);


    if(node.isFolder) {
        return (
            <div>
                <Button
                    variant="ghost"
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    {expanded ? <ChevronDown size={16}/> : <ChevronRight size={16} />}
                    <Folder size={16} />
                    <span>{node.testName}</span>
                </Button>
                {expanded && node.apiTests?.map((child) => (
                    <TreeView key={child.UUID} node={child}  level={level + 1}/>
                ))}
            </div>
        );
    }


    return (
        <div>
            <FileText/>
            <span>{node.testName}</span>
        </div>
    );
}
