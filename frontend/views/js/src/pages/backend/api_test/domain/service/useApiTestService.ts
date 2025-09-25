import useApiTestRepository from "@/pages/backend/api_test/data/repository/useApiTestRepository.ts";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler.ts";
import type {DataTableType} from "@/types";
import ClientDatabaseViewModel
    from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import ProjectListViewModel from "@/pages/backend/api_test/presentation/view_models/ProjectListViewModel.ts";


const useApiTestService = () => {
    const { listProjects: listProjectsRepo } = useApiTestRepository();

    const listProjects = async (
        callbacks?: ServiceCallback<DataTableType<ProjectListViewModel>>
    ) => {
        return handleServiceCall<DataTableType<ProjectListViewModel>>(
            async () => {
                const response = await listProjectsRepo(); // ProjectListDTO

                const rows = response.rows.map((projectDto) => {
                    const clientDbVMs = projectDto.clientDatabases.map(
                        (clientDbDto) => new ClientDatabaseViewModel(clientDbDto)
                    );

                    return new ProjectListViewModel(projectDto, clientDbVMs);
                });

                return {
                    ...response,
                    rows,
                };
            },
            callbacks
        );
    };


    return {
        listProjects,
    };
}


export default useApiTestService;
