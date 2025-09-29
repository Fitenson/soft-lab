import useApiTestRepository from "@/pages/backend/api_test/data/repository/useApiTestRepository.ts";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler.ts";
import type { DataTableType } from "@/types";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import ProjectListViewModel from "@/pages/backend/api_test/presentation/view_models/ProjectListViewModel.ts";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestEntity from "@/pages/backend/api_test/domain/entity/ApiTestEntity.ts";


const useApiTestService = () => {
    const {
        listProjects: listProjectsRepo,
        indexApiTest: indexApiTestRepo,
        createApiTest: createApiTestRepo,
        updateApiTest: updateApiTestRepo,
        removeApiTest: removeApiTestRepo,
    } = useApiTestRepository();


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

    const indexApiTest = async (
        callbacks?: ServiceCallback<DataTableType<ApiTestViewModel>>
    ) => {
        return handleServiceCall<DataTableType<ApiTestViewModel>>(async () => {
            const response = await indexApiTestRepo();
            const rows = response.rows.map(dto => new ApiTestViewModel(dto));

            return {
                ...response,
                rows,
            };
        }, callbacks);
    }


    const createApiTest = async (
        apiTestDTO: Partial<ApiTestDTO>,
        clientDatabaseToken: string,
        callbacks?: ServiceCallback<ApiTestViewModel>
    ) => {
        let apiTestEntity = new ApiTestEntity(apiTestDTO);

        apiTestEntity = await handleServiceCall<ApiTestEntity>(
            async () => createApiTestRepo(apiTestEntity, clientDatabaseToken),
            {
                onSuccess: (entity) => {
                    const viewModel = entity.asViewModel();
                    callbacks?.onSuccess?.(viewModel);
                },
                onError: (error) => {
                    callbacks?.onError?.(error);
                },
            }
        );

        return apiTestEntity.asViewModel();
    };


    const updateApiTest = async (
        apiTestDTO: Partial<ApiTestDTO>,
        callbacks?: ServiceCallback<ApiTestViewModel>
    ) => {
        let apiTestEntity = new ApiTestEntity(apiTestDTO);
        apiTestEntity = await handleServiceCall<ApiTestEntity>(
            async () => updateApiTestRepo(apiTestEntity), 
        {
            onSuccess: (entity) => {
                const viewModel = entity.asViewModel();
                callbacks?.onSuccess?.(viewModel);
            },
            onError: (error) => {
                callbacks?.onError?.(error);
            }
        });
        
        return apiTestEntity.asViewModel();
    }


    const removeApiTest = async (
        UUIDs: string[],
        callbacks?: ServiceCallback<{ success: ApiTestDTO[], failed: ApiTestDTO[] }>
    ) => {
        return await handleServiceCall<{ success: ApiTestDTO[], failed: ApiTestDTO[] }>(async () => removeApiTestRepo(UUIDs), callbacks);
    }


    return {
        listProjects,
        indexApiTest,
        createApiTest,
        updateApiTest,
        removeApiTest,
    };
}


export default useApiTestService;
