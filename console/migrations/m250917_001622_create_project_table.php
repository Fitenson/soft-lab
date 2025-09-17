<?php

use backend\components\db\DbMigration;

/**
 * Handles the creation of table `{{%project}}`.
 */
class m250917_001622_create_project_table extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%project}}', array_merge([
            'UUID' => $this->char(50)->notNull()->append('PRIMARY KEY')->unique(),
            'projectCode' => $this->string(100)->notNull(),
            'projectName' => $this->string(100)->null(),
            'description' => $this->string(500)->null(),
            'secondDescription' => $this->string(750)->null(),
            'moreDescription' => $this->string(1000)->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('{{%project_history}}', array_merge([
            'historyUUID' => $this->char(50)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(50)->notNull(),
            'projectCode' => $this->string(100)->notNull(),
            'projectName' => $this->string(100)->null(),
            'description' => $this->string(500)->null(),
            'secondDescription' => $this->string(750)->null(),
            'moreDescription' => $this->string(1000)->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);


        $this->createForeignKey()
        ->table('project')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('project')
        ->column('updatedBy')
        ->refTable('user')
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
        $this->dropTable('{{%project}}');
        $this->dropTable('{{%project_history}}');
    }
}
