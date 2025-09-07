<?php

namespace backend\components\exception;

use Exception;


class ApiException extends Exception {
    public array $payload;

    public function __construct($payload, int $statusCode = 500)
    {
        parent::__construct($payload['name'] ?? 'Api Error', $statusCode);
        $this->payload = $payload;
    }
}
