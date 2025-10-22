<?php

namespace backend\modules\api_test\domain\entity;

use InvalidArgumentException;
use backend\components\entity\Entity;
use backend\modules\api_test\data\dto\ApiTestHasDataDTO;


class ApiTestHasDataEntity extends Entity {
    protected string $DTOClassName = ApiTestHasDataDTO::class;

    private ?string $UUID = null;
    private ?string $apiTest = null;
    private ?string $fieldType = null;
    private ?string $key = null;
    private ?string $value = null;
    private int $enabled = 1;
    private ?string $description = null;


    public function asArray(): array
    {
        return get_object_vars($this);
    }


    public function setUUID(?string $UUID = null): void
    {
        $this->UUID = $UUID;
    }

    public function getUUID(): ?string
    {
        return $this->UUID;
    }

    public function setApiTest(?string $apiTest = null): void
    {
        $this->apiTest = $apiTest;
    }

    public function getApiTest(): ?string
    {
        return $this->apiTest;
    }

    public function setFieldType(?string $fieldType = null): void
    {
        if ($fieldType === null) {
            $this->fieldType = null;
            return;
        }

        if ($this->isValidBase64($fieldType)) {
            $decoded = base64_decode($fieldType, true);
            $this->fieldType = $decoded !== false ? $decoded : null;
        } else {
            $this->fieldType = "";
        }
    }

    public function getFieldType(): ?string
    {
        return $this->fieldType;
    }

    public function setKey(?string $key = null): void
    {
        $this->key = $key;
    }

    public function getKey(): ?string
    {
        return $this->key;
    }

    public function setValue(?string $value = null): void
    {
        $this->value = $value;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setEnabled(int $enabled): void
    {
        $this->enabled = $enabled;
    }

    public function getEnabled(): int
    {
        return $this->enabled;
    }

    public function setDescription(?string $description = null): void
    {
        $this->description = $description;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }


    /**
     * Validate if a string is valid Base64.
     */
    private function isValidBase64(string $string): bool
    {
        // Base64 strings must be multiple of 4 and only contain A–Z, a–z, 0–9, +, /, or =
        if (preg_match('/^[A-Za-z0-9+\/=]+$/', $string) && strlen($string) % 4 === 0) {
            $decoded = base64_decode($string, true);
            return $decoded !== false && base64_encode($decoded) === $string;
        }
        return false;
    }
}
