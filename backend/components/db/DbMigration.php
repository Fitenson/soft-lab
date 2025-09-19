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
        foreach ($this->foreignKeys as $foreignKey) {
            $this->addForeignKey(
                $foreignKey->getName(),
                $foreignKey->getTable(),
                $foreignKey->getColumn(),
                $foreignKey->getRefTable(),
                $foreignKey->getRefColumn(),
                $foreignKey->getOnDelete()
            );
        }
    }


    protected function timestamps(): array
    {
        return [
            'createdAt' => $this->string(30),
            'updatedAt' => $this->string(30),
            'createdBy' => $this->string(30),
            'updatedBy' => $this->string(30),
        ];
    }


    protected function systemFields(): array
    {
        return [
            'valid' => $this->boolean(),
            '_actionUUID' => $this->string(40),
            '_version' => $this->integer(),
        ];
    }


    protected function historyFields(): array
    {
        return [
            'historyUUID' => $this->char(50)->append('PRIMARY KEY')->unique(),
            'user_id' => $this->char(50)->notNull(),
            'action' => $this->string(50),
            'date_created' => $this->string(100),
        ];
    }


    protected $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
}
