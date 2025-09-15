<?php

namespace backend\modules\user\domain\repository;

use backend\modules\user\domain\entity\UserEntity;


interface UserRepository {
    public function index(array $params);
    public function create(UserEntity $userEntity): UserEntity;
    public function update(UserEntity $userEntity): UserEntity;
    public function view(string $id): UserEntity;
    public function remove(array $data): array;
}
