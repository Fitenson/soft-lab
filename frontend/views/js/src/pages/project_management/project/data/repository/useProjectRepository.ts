import { useRequest } from "@/lib/useRequest.ts";
import type { DataTableType, Params } from "@/types";
import { projectFormData, type ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO.ts";
import ProjectEntity from "@/pages/project_management/project/domain/entity/ProjectEntity.ts";


const useProjectRepository = () => {
    const { request } = useRequest();


    const indexProject = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        if(params.filter !== "{}") {
            formData.append("param[filter] ", params.filter);
        }

        return await request<DataTableType<ProjectDTO>>({
            url: "/project/index",
            method: "POST",
            data: formData,
        });
    }


    const createProject = async (projectEntity: ProjectEntity) => {
        const projectDTO: Partial<ProjectDTO> = projectEntity.asDto();
        const formData = projectFormData(projectDTO, new FormData());

        const response = await request<{ project: ProjectDTO }>({
            url: "/project/create",
            method: "POST",
            data: formData
        });

        const newProjectDTO = response.project;
        return new ProjectEntity(newProjectDTO);
    }


    const updateProject = async (projectEntity: ProjectEntity) => {
        const projectDTO: Partial<ProjectDTO> = projectEntity.asDto();
        const formData = projectFormData(projectDTO, new FormData());

        const response = await request<{ project: ProjectDTO }>({
            url: `/project/update?id=${projectDTO.UUID}`,
            method: "POST",
            data: formData
        });

        const newProjectDTO = response.project;
        return new ProjectEntity(newProjectDTO);
    }


    const removeProject = async (UUIDs: string[]) => {
        const formData = new FormData();

        UUIDs.forEach((UUID) => {
            formData.append("UUIDs[]", UUID);
        });

        return await request<{ success: ProjectDTO[], failed: ProjectDTO[] }>({
            url: "/project/remove",
            method: "POST",
            data: formData,
        });
    }


    return {
        indexProject,
        createProject,
        updateProject,
        removeProject
    }
}


export default useProjectRepository;
