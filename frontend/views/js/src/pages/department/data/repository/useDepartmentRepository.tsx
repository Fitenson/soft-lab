import { useRequest } from "@/lib/useRequest";
import type { DataTableType, Params} from "@/types";
import type { DepartmentDTO } from "@/pages/department/data/dto/DepartmentDTO.ts";
import DepartmentEntity from "@/pages/department/domain/entity/DepartmentEntity.ts";


const useDepartmentRepository = () => {
    const { request } = useRequest();


    const index = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        return await request<DataTableType<DepartmentDTO>>({
            url: "/department/index",
            method: "POST",
            data: formData
        });
    }


    const create = async (departmentEntity: DepartmentEntity) => {
        const departmentDTO: Partial<DepartmentDTO> = departmentEntity.asDto();
        const formData = new FormData();

        formData.append("department", departmentDTO.departmentID ?? "");
        formData.append("departmentName", departmentDTO.departmentName ?? "");
        formData.append("head", departmentDTO.head ?? "");
        formData.append("description", departmentDTO.description ?? "");

        const newDepartmentDTO = await request<DepartmentDTO>({
            url: "/department/create",
            method: "POST",
            data: formData,
        });

        return new DepartmentEntity(newDepartmentDTO);
    }


    const update = async (departmentEntity: DepartmentEntity) => {
        const departmentDTO: Partial<DepartmentDTO> = departmentEntity.asDto();
        const formData = new FormData();

        formData.append("department", departmentDTO.departmentID ?? "");
        formData.append("departmentName", departmentDTO.departmentName ?? "");
        formData.append("head", departmentDTO.head ?? "");
        formData.append("description", departmentDTO.description ?? "");

        const newDepartmentDTO = await request<DepartmentDTO>({
            url: `/department/update?id=${departmentDTO.UUID}`,
            method: "POST",
            data: formData,
        });

        return new DepartmentEntity(newDepartmentDTO);
    }


    const view = async (id: string) => {
        const departmentDTO = await request<DepartmentDTO>({
            url: `/department/${id}`,
            method: "GET",
        });

        return new DepartmentEntity(departmentDTO);
    }


    return {
        index,
        create,
        update,
        view,
    };
}


export default useDepartmentRepository;
