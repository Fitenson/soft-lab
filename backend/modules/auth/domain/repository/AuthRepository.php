<?php

namespace backend\modules\auth\domain\repository;

use backend\modules\auth\domain\entity\Auth;


interface AuthRepository {
    public function login(Auth $auth);
    public function register(Auth $auth);
}
