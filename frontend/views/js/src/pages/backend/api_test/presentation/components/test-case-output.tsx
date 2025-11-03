import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";


export default function TestCaseOutput() {
    return (
        <ResizablePanelGroup direction="horizontal" className="min-h-[300px] border rounded-lg">
            <ResizablePanel defaultSize={50}>
                <div className="p-4 bg-muted/30">
                    <h3 className="font-semibold mb-2">Actual Output</h3>
                    <div>...</div>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
                <div className="p-4 bg-muted/30">
                    <h3 className="font-semibold mb-2">Expected Output</h3>
                    <div>...</div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}