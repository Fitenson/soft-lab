<?php

use backend\components\db\DbMigration;

/**
 * Handles the creation of table `{{%department}}`.
 */
class m250912_010531_create_department_table extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%department}}', array_merge([
            'UUID' => $this->char(50)->notNull()->append('PRIMARY KEY')->unique(),
            'departmentID' => $this->string(100)->notNull(),
            'departmentName' => $this->string(100)->notNull(),
            'head' => $this->char(50)->null(),
            'description' => $this->string(1000)->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('{{%department_history}}', array_merge([
            'UUID' => $this->char(50)->notNull(),
            'departmentID' => $this->string(100)->notNull(),
            'departmentName' => $this->string(100)->notNull(),
            'head' => $this->char(50)->null(),
            'description' => $this->string(1000)->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);

        $this->createForeignKey()
        ->table('department')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('department')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('department')
        ->column('head')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->addColumn('{{%user}}', 'department', $this->char(50)->null());
        $this->addColumn('{{%user_history}}', 'department', $this->char(50)->null());

        $this->createForeignKey()
        ->table('user')
        ->column('department')
        ->refTable('department')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->addForeignKeys();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%department}}');
        $this->dropTable('{{%department_history}}');
    }
}
