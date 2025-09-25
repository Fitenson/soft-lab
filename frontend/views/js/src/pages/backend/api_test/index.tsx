import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import type {BreadcrumbItem, DataTableType} from "@/types";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/pages/backend/api_test/presentation/components/project-card";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService.ts";
import ProjectListViewModel from "@/pages/backend/api_test/presentation/view_models/ProjectListViewModel.ts";


export default function ApiTestIndex() {
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: "Backend",
            href: "/backend"
        },
        {
            title: "API Test Case",
            href: "/backend/api-test"
        }
    ];

    const { listProjects } = useApiTestService();

    const { data  } = useQuery<DataTableType<ProjectListViewModel>>({
        queryKey: ["/backend/api-test/list-projects"],
        queryFn: () => listProjects(),
        enabled: true
    });


    return (
        <AppLayout breadcrumbs={breadcrumbItems}>
            <Head title="API Test Case" />
            <ApiTestLayout>
                <div className="w-full h-full grid grid-cols-6 grid-rows-3">
                    {data?.rows?.map((projectViewModel: ProjectListViewModel) => (
                        <ProjectCard projectViewModel={projectViewModel} />
                    ))}
                </div>
            </ApiTestLayout>
        </AppLayout>
    );
}
