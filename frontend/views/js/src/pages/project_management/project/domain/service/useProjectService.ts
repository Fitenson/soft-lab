import useProjectRepository from "@/pages/project_management/project/data/repository/useProjectRepository.ts";
import type {DataTableType, Params} from "@/types";
import {handleServiceCall, type ServiceCallback} from "@/core/domain/service/serviceHandler.ts";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";


const useProjectService = () => {
    const { indexProject: indexProjectRepo } = useProjectRepository();


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


    return {
        indexProject,
    }
}


export default useProjectService;