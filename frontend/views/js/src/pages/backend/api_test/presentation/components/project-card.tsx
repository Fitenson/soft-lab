import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";
import { Button } from "@/components/ui/button.tsx";


export default function ProjectCard({ projectViewModel }: { projectViewModel: ProjectViewModel }) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle className="text-center font-semibold">{projectViewModel.projectCode}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="text-start text-foreground dark:text-foreground">
                    <span className="font-medium">Project: </span>
                    <span className="font-normal">{projectViewModel.projectName}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-2">
                <Button className="w-full">
                    Connect
                </Button>
            </CardFooter>
        </Card>
    );
}
