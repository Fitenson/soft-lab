<?php

namespace backend\modules\department\domain\usecase;

use Yii;
use Throwable;
use backend\modules\department\domain\entity\DepartmentEntity;
use backend\modules\department\domain\repository\DepartmentRepository;


class UpdateDepartmentUseCase {
    private DepartmentRepository $departmentRepository;

    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }


    public function execute(DepartmentEntity $departmentEntity)
    {
        try {
            $newDepartmentEntity = $this->departmentRepository->update($departmentEntity);
            return $newDepartmentEntity->asDTO();
        } catch(Throwable $error) {
            Yii::$app->exception->throw($error->getMessage(), 422);
        }
    }
}
