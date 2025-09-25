import { useRequest } from "@/lib/useRequest.ts";
import type {ProjectListDTO} from "@/pages/backend/api_test/data/dto/ProjectListDTO.ts";
import { useCallback } from "react";


const useApiTestRepository = () => {
    const { request } = useRequest();

    const listProjects = useCallback(async () => {
        return request<ProjectListDTO>({
            url: "/api-test/list-projects",
            method: "GET",
        });
    }, [request]);


    return {
        listProjects,
    };
}


export default useApiTestRepository
