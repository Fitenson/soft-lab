<?php

namespace backend\modules\department\domain\repository;

use backend\modules\department\domain\entity\DepartmentEntity;


interface DepartmentRepository {
    public function index(array $params);
    public function create(DepartmentEntity $departmentEntity): DepartmentEntity;
    public function update(DepartmentEntity $departmentEntity): DepartmentEntity;
    public function view(string $id): DepartmentEntity;
    public function remove(array $data);
    public function setActionUUID(): void;
}
