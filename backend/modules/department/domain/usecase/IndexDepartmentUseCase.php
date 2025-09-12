<?php

namespace backend\modules\department\domain\usecase;

use backend\modules\department\domain\repository\DepartmentRepository;


class IndexDepartmentUseCase {
    private DepartmentRepository $departmentRepository;


    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }


    public function execute(array $params)
    {
        return $this->departmentRepository->index($params);
    }
}
