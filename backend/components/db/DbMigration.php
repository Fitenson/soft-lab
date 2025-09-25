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
            'createdAt' => $this->string(40)->null(),
            'updatedAt' => $this->string(30)->null(),
            'createdBy' => $this->string(40)->null(),
            'updatedBy' => $this->string(30)->null(),
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
            'historyUUID' => $this->char(40)->append('PRIMARY KEY')->unique(),
            'user_id' => $this->char(40)->notNull(),
            'action' => $this->string(40)->notNull(),
            'date_created' => $this->string(100)->notNull(),
        ];
    }


    protected $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
}
