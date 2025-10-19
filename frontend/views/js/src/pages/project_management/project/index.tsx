import breadcrumbItems from "@/components/app/breadcrumb-items";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import AppLayout from "@/layouts/app-layout";
import useProjectService from "@/pages/project_management/project/domain/service/useProjectService";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import ProjectLayout from "./presentation/layouts/project-layout";
import HeadingSmall from "@/components/app/heading-small";
import ProjectDataTable from "@/pages/project_management/project/presentation/components/main/project-data-table";
import { projectMainColumns } from "@/pages/project_management/project/presentation/components/main/projectMainColumns";
import type {BreadcrumbItem} from "@/types";
import {useEffect} from "react";


export default function ProjectGridview() {
    const { params } = useAppSelector(state => state.projectDataTable);
    const { indexProject  } = useProjectService();

    const { data, refetch} = useQuery({
        queryKey: ["/project_management/project/index", params],
        queryFn: async () => indexProject(params),
        enabled: true
    });

    const breadcrumbs: BreadcrumbItem[] = [
        ...(breadcrumbItems ?? []),
        { title: "Project", href: "/project_management/project" },
    ];

    useEffect(() => {
        console.log("Project: ", data);
    }, [data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />

            <ProjectLayout>
                <section className="w-full mx-auto">
                    <HeadingSmall title="Projects" />
                    <ProjectDataTable
                        data={data?.rows ?? []}
                        columns={projectMainColumns}
                        onRefresh={refetch}
                    />
                </section>
            </ProjectLayout>
        </AppLayout>
    );
}
