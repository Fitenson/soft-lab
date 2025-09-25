import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import type { BreadcrumbItem } from "@/types";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { useQuery } from "@tanstack/react-query";
import useProjectService from "@/pages/project_management/project/domain/service/useProjectService";
import ProjectCard from "@/pages/backend/api_test/presentation/components/project-card";
import type ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel";


export default function ApiTestIndex() {
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: "API Test Case",
            href: "/backend/api-test"
        }
    ];

    const { params } = useAppSelector(state => state.projectDataTable);
    const { indexProject } = useProjectService();

    const { data  } = useQuery({
        queryKey: ["/project_management/project/index", params],
        queryFn: async () => indexProject(params),
        enabled: true
    });


    return (
        <AppLayout breadcrumbs={breadcrumbItems}>
            <Head title="API Test Case" />
            <ApiTestLayout>
                <div className="w-full h-full grid grid-cols-6 grid-rows-3">
                    {data?.rows?.map((projectViewModel: ProjectViewModel) => (
                        <ProjectCard projectViewModel={projectViewModel} />
                    ))}
                </div>
            </ApiTestLayout>
        </AppLayout>
    );
}
