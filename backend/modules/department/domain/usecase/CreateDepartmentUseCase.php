<?php

namespace backend\modules\department\domain\usecase;

use backend\modules\department\domain\entity\DepartmentEntity;
use backend\modules\department\domain\repository\DepartmentRepository;
use backend\modules\department\data\dto\DepartmentDTO;


class CreateDepartmentUseCase {
    private DepartmentRepository $departmentRepository;

    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }


    public function execute(DepartmentEntity $departmentEntity): DepartmentDTO
    {
        $newDepartmentEntity = $this->departmentRepository->create($departmentEntity);
        return $newDepartmentEntity->asDTO();
    }
}
