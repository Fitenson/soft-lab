<?php

namespace backend\components\db;

use yii\db\Migration;


class DbMigration extends Migration {
    private array $foreignKeys = [];
    private ?ForeignKey $currentForeignKey = null;


    public function createForeignKey(): self
    {
        $this->currentForeignKey = new ForeignKey;
        return $this;
    }

    public function table(string $table): self
    {
        $this->currentForeignKey->setTable($table);
        return $this;
    }

    public function column(string $column): self
    {
        $this->currentForeignKey->setColumn($column);
        return $this;
    }

    public function refTable(string $table): self
    {
        $this->currentForeignKey->setRefTable($table);
        return $this;
    }

    public function refColumn(string $column): self
    {
        $this->currentForeignKey->setRefColumn($column);
        return $this;
    }

    public function onDeleteRestrict(): self
    {
        $this->currentForeignKey->setOnDelete('RESTRICT');
        return $this;
    }

    public function onDeleteCascade(): self
    {
        $this->currentForeignKey->setOnDelete('CASCADE');
        return $this;
    }

    public function onDeleteNoAction(): self
    {
        $this->currentForeignKey->setOnDelete('NO ACTION');
        return $this;
    }

    public function onDeleteNull(): self
    {
        $this->currentForeignKey->setOnDelete('SET NULL');
        return $this;
    }

    public function build(): self
    {
        if(!empty($this->currentForeignKey)) {
            $this->currentForeignKey->setName();
            $this->foreignKeys[] = $this->currentForeignKey;
            $this->currentForeignKey = null;
        }
        return $this;
    }

    public function addForeignKeys(): void
    {
        foreach($this->foreignKeys as $foreignKey) {
            $this->addForeignKey(
                $foreignKey->getName(),
                "{{%{$foreignKey->getTable()}}}",
                $foreignKey->getRefTable(),
                $foreignKey->getRefColumn(),
                $foreignKey->getOnDelete()
            );
        }
    }
}
