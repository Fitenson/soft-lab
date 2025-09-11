<?php

namespace backend\modules\auth\domain\repository;

use backend\modules\auth\domain\entity\AuthEntity;


interface AuthRepository {
    public function login(AuthEntity $authEntity): AuthEntity;
    public function register(AuthEntity $authEntity): AuthEntity;
    public function logout();
    public function setActionUUID();
}
