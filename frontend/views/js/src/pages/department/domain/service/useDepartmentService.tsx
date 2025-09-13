import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import type { DataTableType, Params } from "@/types";
import useDepartmentRepository from "@/pages/department/data/repository/useDepartmentRepository.tsx";
import DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";
import type {DepartmentDTO} from "@/pages/department/data/dto/DepartmentDTO.ts";
import DepartmentEntity from "@/pages/department/domain/entity/DepartmentEntity.ts";


const useDepartmentService = () => {
    const { index: indexRepo, create: createRepo, update: updateRepo, view: viewRepo } = useDepartmentRepository();

    const index = async (
        params: Params,
        callbacks?: ServiceCallback<DataTableType<DepartmentViewModel>>
    ) => {
        return handleServiceCall<DataTableType<DepartmentViewModel>>(async () => {
            const response = await indexRepo(params);
            const rows = response.rows.map(dto => new DepartmentViewModel(dto));

            return {
                ...response,
                rows
            };
        }, callbacks);
    };


    const create = async (
        departmentDTO: Partial<DepartmentDTO>,
        callbacks?: ServiceCallback<DepartmentEntity>
    ) => {
        let departmentEntity = new DepartmentEntity(departmentDTO);
        departmentEntity = await handleServiceCall<DepartmentEntity>(async () => createRepo(departmentEntity), callbacks);
        return departmentEntity.asViewModel();
    };


    const update = async (
        departmentDTO: Partial<DepartmentDTO>,
        callbacks?: ServiceCallback<DepartmentEntity>
    ) => {
        let departmentEntity = new DepartmentEntity(departmentDTO);
        departmentEntity = await handleServiceCall<DepartmentEntity>(async () => updateRepo(departmentEntity), callbacks);
        return departmentEntity.asViewModel();
    };


    const view = async (
        id: string,
        callbacks?: ServiceCallback<DepartmentEntity>
    ) => {
        return await handleServiceCall(async () => viewRepo(id), callbacks);
    }


    return {
        index,
        create,
        update,
        view
    };
};


export default useDepartmentService;
