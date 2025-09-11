<?php

namespace backend\modules\user\domain\repository;


interface UserRepository {
    public function index(array $params);
    public function create();
    public function update();
    public function remove(array $data);
}
