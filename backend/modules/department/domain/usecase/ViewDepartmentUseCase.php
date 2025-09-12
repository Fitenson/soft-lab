<?php

namespace backend\modules\department\domain\usecase;

use backend\modules\department\data\dto\DepartmentDTO;
use backend\modules\department\domain\repository\DepartmentRepository;


class ViewDepartmentUseCase {
    private DepartmentRepository $departmentRepository;


    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }


    public function execute(string $id): DepartmentDTO
    {
        $DepartmentEntity = $this->departmentRepository->view($id);
        return $DepartmentEntity->asDTO();
    }
}
