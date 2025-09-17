import useProjectRepository from "@/pages/project_management/project/data/repository/useProjectRepository.ts";
import type { DataTableType, Params } from "@/types";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler.ts";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO";
import ProjectEntity from "@/pages/project_management/project/domain/entity/ProjectEntity";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";


const useProjectService = () => {
    const { indexProject: indexProjectRepo, createProject: createProjectRepo, updateProject: updateProjectRepo, removeProject: removeProjectRepo } = useProjectRepository();


    const indexProject = async (
        params: Params,
        callbacks?: ServiceCallback<DataTableType<ProjectViewModel>>,
    ) => {
        return handleServiceCall<DataTableType<ProjectViewModel>>(async () => {
            const response = await indexProjectRepo(params);
            const rows = response.rows.map((dto) => new ProjectViewModel(dto));

            return {
                ...response,
                rows
            };
        }, callbacks);
    }


    const createProject = async (
        ProjectDTO: Partial<ProjectDTO>,
        callbacks?: ServiceCallback<ProjectEntity>
    ) => {
        let projectEntity = new ProjectEntity(ProjectDTO);
        projectEntity = await handleServiceCall<ProjectEntity>(async () => createProjectRepo(projectEntity), callbacks);
        return projectEntity.asViewModel();
    };


    const updateProject = async (
        ProjectDTO: Partial<ProjectDTO>,
        callbacks?: ServiceCallback<ProjectEntity>
    ) => {
        let projectEntity = new ProjectEntity(ProjectDTO);
        projectEntity = await handleServiceCall<ProjectEntity>(async () => updateProjectRepo(projectEntity), callbacks);
        return projectEntity.asViewModel();
    };


    const removeProject = async (
        UUIDs: string[],
        callbacks?: ServiceCallback<{ success: ProjectDTO[], failed: ProjectDTO[] }>
    ) => {
        return await handleServiceCall<{ success: ProjectDTO[], failed: ProjectDTO[] }>(async () => removeProjectRepo(UUIDs), callbacks);
    }


    return {
        indexProject,
        createProject,
        updateProject,
        removeProject
    }
}


export default useProjectService;
