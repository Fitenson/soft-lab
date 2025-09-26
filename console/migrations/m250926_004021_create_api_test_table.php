<?php

use backend\components\db\DbMigration;

/**
 * Handles the creation of table `{{%api_test}}`.
 */
class m250926_004021_create_api_test_table extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%apiTest}}', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'parentApiTest' => $this->char(40)->null(),
            'clientDatabase' => $this->char(40)->notNull(),
            'project' => $this->char(40)->notNull(),
            'testName' => $this->string(50)->notNull(),
            'useCase' => $this->string(50)->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'data' => $this->text()->null(),
            'output' => $this->text()->null(),
            'transmission' => $this->string(30),
            'scenario' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('{{%apiTest_history}}', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'parentApiTest' => $this->char(40)->null(),
            'clientDatabase' => $this->char(40)->notNull(),
            'project' => $this->char(40)->notNull(),
            'testName' => $this->string(50)->notNull(),
            'useCase' => $this->string(50)->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'data' => $this->text()->null(),
            'output' => $this->text()->null(),
            'transmission' => $this->string(30),
            'scenario' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);

        $this->createForeignKey()
        ->table('apiTest')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTest')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTest')
        ->column('parentApiTest')
        ->refTable('apiTest')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();

        $this->createForeignKey()
        ->table('apiTest')
        ->column('clientDatabase')
        ->refTable('clientDatabase')
        ->refColumn('UUID')
        ->onDeleteRestrict()
        ->build();

        $this->createForeignKey()
        ->table('apiTest')
        ->column('project')
        ->refTable('project')
        ->refColumn('UUID')
        ->onDeleteRestrict()
        ->build();

        $this->addForeignKeys();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%apiTest}}');
        $this->dropTable('{{%apiTest_history}}');
    }
}
