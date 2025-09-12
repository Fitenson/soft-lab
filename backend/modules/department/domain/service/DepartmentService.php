<?php

namespace backend\modules\department\domain\service;

use backend\modules\department\domain\entity\DepartmentEntity;
use backend\modules\department\domain\usecase\CreateDepartmentUseCase;
use backend\modules\department\domain\usecase\IndexDepartmentUseCase;
use backend\modules\department\domain\usecase\UpdateDepartmentUseCase;
use backend\modules\department\data\dto\DepartmentDTO;
use backend\modules\department\domain\usecase\ViewDepartmentUseCase;

class DepartmentService {
    private IndexDepartmentUseCase $indexDepartmentUseCase;
    private CreateDepartmentUseCase $createDepartmentUseCase;
    private UpdateDepartmentUseCase $updateDepartmentUseCase;
    private ViewDepartmentUseCase $viewDepartmentUseCase;


    public function __construct(
        IndexDepartmentUseCase $indexDepartmentUseCase,
        CreateDepartmentUseCase $createDepartmentUseCase,
        UpdateDepartmentUseCase $updateDepartmentUseCase,
        ViewDepartmentUseCase $viewDepartmentUseCase
    )
    {
        $this->indexDepartmentUseCase = $indexDepartmentUseCase;
        $this->createDepartmentUseCase = $createDepartmentUseCase;
        $this->updateDepartmentUseCase = $updateDepartmentUseCase;
        $this->viewDepartmentUseCase = $viewDepartmentUseCase;
    }


    public function index(array $params) {
        return $this->indexDepartmentUseCase->execute($params);
    }


    public function createDepartment(DepartmentEntity $DepartmentEntity): DepartmentDTO
    {
        return $this->createDepartmentUseCase->execute($DepartmentEntity);
    }


    public function updateDepartment(DepartmentEntity $DepartmentEntity): DepartmentDTO
    {
        return $this->updateDepartmentUseCase->execute($DepartmentEntity);
    }

    
    public function viewDepartment(string $id): DepartmentDTO
    {
        return $this->viewDepartmentUseCase->execute($id);
    }
}
