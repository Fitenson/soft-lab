<?php

namespace backend\modules\project\domain\repository;

use backend\modules\project\domain\entity\ProjectEntity;


interface ProjectRepository {
    public function index(array $params);
    public function create(ProjectEntity $projectEntity): ProjectEntity;
    public function update(ProjectEntity $projectEntity): ProjectEntity;
    public function view(string $id): ProjectEntity;
    public function remove(array $data): array;
    public function dropdownTable(array $params);
    public function listProjects();
}
