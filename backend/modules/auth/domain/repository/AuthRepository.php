<?php

namespace backend\modules\auth\domain\repository;

use backend\modules\auth\domain\entity\AuthEntity;


interface AuthRepository {
    public function login(AuthEntity $authEntity);
    public function register(AuthEntity $authEntity);
    public function logout();
    public function setActionUUID();
}
