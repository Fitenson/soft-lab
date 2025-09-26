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
            'clientDatabase' => $this->char(40)->notNull(),
            'project' => $this->char(40)->notNull(),
            'testName' => $this->string(50)->notNull(),
            'useCase' => $this->string(50)->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'json' => $this->text()->null(),
            'transmission' => $this->string(30),
            'scenario' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('{{%apiTest_history}}', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'clientDatabase' => $this->char(40)->notNull(),
            'project' => $this->char(40)->notNull(),
            'testName' => $this->string(50)->notNull(),
            'useCase' => $this->string(50)->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'json' => $this->text()->null(),
            'transmission' => $this->string(30),
            'scenario' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);
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
