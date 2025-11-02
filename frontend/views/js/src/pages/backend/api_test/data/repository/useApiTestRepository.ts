import { useRequest } from "@/lib/useRequest.ts";
import type { ProjectListDTO } from "@/pages/backend/api_test/data/dto/ProjectListDTO.ts";
import type { DataTableType } from "@/types";
import { type ApiTestDTO, apiTestFormData } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestEntity from "@/pages/backend/api_test/domain/entity/ApiTestEntity.ts";
import {type ApiTestDataDTO, apiTestDataFormData} from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";
import ApiTestDataEntity from "@/pages/backend/api_test/domain/entity/ApiTestDataEntity.ts";


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


    const createApiTest = async ({
        apiTestEntity,
        clientDatabaseToken
    }: { apiTestEntity: ApiTestEntity, clientDatabaseToken: string}) => {
        const apiTestDTO: Partial<ApiTestDTO> = apiTestEntity.asDto();
        const formData: FormData = apiTestFormData(apiTestDTO, new FormData());

        if (Array.isArray(apiTestDTO.apiTestHasDatas) && apiTestDTO.apiTestHasDatas.length > 0) {
            apiTestDataFormData(apiTestDTO.apiTestHasDatas, formData);
        }

        const response = await request<{ apiTest: ApiTestDTO, apiTestHasData: ApiTestDataDTO[] }>({
            url: `/api-test/create`,
            method: "POST",
            data: formData,
            headers: {
                "X-Client-Database-Token": clientDatabaseToken
            }
        });

        const newApiTestDTO: ApiTestDTO = response.apiTest;
        const newApiTestDataDTO: ApiTestDataDTO[] = response.apiTestHasData;

        const newApiTestEntity = new ApiTestEntity(newApiTestDTO);
        newApiTestEntity.apiTestHasDatas = newApiTestDataDTO.map((dto) => new ApiTestDataEntity(dto));

        return newApiTestEntity;
    }


    const updateApiTest = async ({
        apiTestEntity,
        clientDatabaseToken
    }: { apiTestEntity: ApiTestEntity, clientDatabaseToken: string }) => {
        const apiTestDTO: Partial<ApiTestDTO> = apiTestEntity.asDto();
        const formData: FormData = apiTestFormData(apiTestDTO, new FormData());

        if (Array.isArray(apiTestDTO.apiTestHasDatas) && apiTestDTO.apiTestHasDatas.length > 0) {
            apiTestDataFormData(apiTestDTO.apiTestHasDatas, formData);
        }

        const response = await request<{ apiTest: ApiTestDTO, apiTestHasData: ApiTestDataDTO[] }>({
            url: `/api-test/update?id=${apiTestDTO.UUID}`,
            method: "POST",
            data: formData,
            headers: {
                "X-Client-Database-Token": clientDatabaseToken
            }
        });

        const newApiTestDTO: ApiTestDTO = response.apiTest;
        const newApiTestDataDTO: ApiTestDataDTO[] = response.apiTestHasData;
        const newApiTestEntity = new ApiTestEntity(newApiTestDTO);

        newApiTestEntity.apiTestHasDatas = newApiTestDataDTO.map((dto) => new ApiTestDataEntity(dto));

        return newApiTestEntity;
    }


    const removeApiTest = async (UUIDs: string[]) => {
        const formData = new FormData();

        UUIDs.forEach((UUID) => {
            formData.append("UUIDs[]", UUID);
        });

        return await request<{ success: ApiTestDTO[], failed: ApiTestDTO[] }>({
            url: "/api-test/remove",
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
