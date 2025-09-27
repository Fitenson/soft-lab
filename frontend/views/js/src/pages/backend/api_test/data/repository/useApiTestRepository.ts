import { useRequest } from "@/lib/useRequest.ts";
import type {ProjectListDTO} from "@/pages/backend/api_test/data/dto/ProjectListDTO.ts";
import type {DataTableType} from "@/types";
import {type ApiTestDTO, apiTestFormData} from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestEntity from "@/pages/backend/api_test/domain/entity/ApiTestEntity.ts";


const useApiTestRepository = () => {
    const { request } = useRequest();

    const listProjects = async () => {
        return request<ProjectListDTO>({
            url: "/api-test/list-projects",
            method: "GET",
        });
    }


    const indexApiTest = async () => {
        return request<DataTableType<ApiTestDTO>>({
            url: `/api-test/index`,
            method: "GET",
        });
    }


    const createApiTest = async (apiTestEntity: ApiTestEntity) => {
        const apiTestDTO: Partial<ApiTestDTO> = apiTestEntity.asDto();
        const formData: FormData = apiTestFormData(apiTestDTO, new FormData());

        const response = await request<{ apiTest: ApiTestDTO}>({
            url: `/api-test/create`,
            method: "POST",
            data: formData,
        });

        const newApiTestDTO: ApiTestDTO = response.apiTest;
        return new ApiTestEntity(newApiTestDTO);
    }


    const updateApiTest = async (apiTestEntity: ApiTestEntity) => {
        const apiTestDTO: Partial<ApiTestDTO> = apiTestEntity.asDto();
        const formData: FormData = apiTestFormData(apiTestDTO, new FormData());

        const response = await request<{ apiTest: ApiTestDTO}>({
            url: `/api-test/update?id=${apiTestDTO.UUID}`,
            method: "POST",
            data: formData,
        });

        const newApiTestDTO: ApiTestDTO = response.apiTest;
        return new ApiTestEntity(newApiTestDTO);
    }


    const removeApiTest = async (UUIDs: string[]) => {
        const formData = new FormData();

        UUIDs.forEach((UUID) => {
            formData.append("UUIDs[]", UUID);
        });

        return await request<{ success: ApiTestDTO[], failed: ApiTestDTO[] }>({
            url: "/client-database/remove",
            method: "POST",
            data: formData,
        });
    }


    return {
        listProjects,
        indexApiTest,
        createApiTest,
        updateApiTest,
        removeApiTest,
    };
}


export default useApiTestRepository
