<?php

namespace backend\components\db;

use yii\db\IntegrityException;

class ForeignKey {
    private string $name;
    private string $table;
    private string $column;
    private string $refTable;
    private string $refColumn;
    private ?string $onDelete;
    private ?string $onUpdate;


    public function setTable(string $table): void
    {
        $this->table = $table;
    }

    public function setColumn(string $column): void
    {
        $this->column = $column;
    }

    public function setRefTable(string $refTable): void
    {
        $this->refTable = $refTable;
    }

    public function setRefColumn(string $refColumn): void
    {
        $this->refColumn = $refColumn;
    }

    public function setOnDelete(string $onDelete): void
    {
        $this->onDelete = $onDelete;
    }

    public function setOnUpdate(string $onUpdate): void
    {
        $this->onUpdate = $onUpdate;
    }

    public function setName(): void
    {
        if($this->table) {
            throw new IntegrityException('Missing table when creating foreign key');
        }

        if($this->refTable) {
            throw new IntegrityException('Missing reference table when creating foreign key');
        }

        if($this->refColumn) {
            throw new IntegrityException('Missing reference column when creating foreign key');
        }

        $this->name = 'fk_' . $this->table . '_' . $this->column;
    }


    public function getName(): string
    {
        return $this->name;
    }

    public function getTable(): string
    {
        return $this->table;
    }

    public function getColumn(): string
    {
        return $this->column;
    }

    public function getRefTable(): string
    {
        return $this->refTable;
    }

    public function getRefColumn(): string
    {
        return $this->refColumn;
    }

    public function getOnDelete(): string
    {
        return !empty($this->onDelete) ? $this->onDelete : 'SET DEFAULT';
    }

    public function getOnUpdate(): string
    {
        return $this->onUpdate;
    }
}
