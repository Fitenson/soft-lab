import { useRequest } from "@/lib/useRequest.ts";
import type {DataTableType, Params} from "@/types";
import type {ProjectDTO} from "@/pages/project_management/project/data/dto/ProjectDTO.ts";
import type {ProjectEntity} from "@/pages/project_management/project/domain/entity/ProjectEntity.ts";


const useProjectRepository = () => {
    const { request } = useRequest();


    const indexProject = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        return await request<DataTableType<ProjectDTO>>({
            url: "/project/index",
            method: "POST",
            data: formData,
        });
    }


    const createProject = async (projectEntity: ProjectEntity) => {
        const projectDTO: Partial<ProjectDTO> = projectEntity.asDto();
        const formData = new FormData();

        formData.append("project[projectCode]", projectDTO.projectCode ?? "");
    }


    return {
        indexProject,
    }
}


export default useProjectRepository;
