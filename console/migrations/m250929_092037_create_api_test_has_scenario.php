<?php

use backend\components\db\DbMigration;

class m250929_092037_create_api_test_has_scenario extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%apiTestHasScenario}}', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'apiTest' => $this->char(40)->notNull(),
            'apiTestHasData' => $this->char(40)->null(),
            'apiTestHasOutput' => $this->char(40)->null(),
            'scenario' => $this->string(100)->null(),
            'seq' => $this->smallInteger()->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);

        $this->createTable('{{%apiTestHasScenario_history}}', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'apiTest' => $this->char(40)->notNull(),
            'apiTestHasData' => $this->char(40)->null(),
            'apiTestHasOutput' => $this->char(40)->null(),
            'scenario' => $this->string(100)->null(),
            'seq' => $this->smallInteger()->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);


        $this->createForeignKey()
        ->table('apiTestHasScenario')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasScenario')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasScenario')
        ->column('apiTest')
        ->refTable('apiTest')
        ->refColumn('UUID')
        ->onDeleteRestrict()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasScenario')
        ->column('apiTestHasData')
        ->refTable('apiTestHasData')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasScenario')
        ->column('apiTestHasOutput')
        ->refTable('apiTestHasOutput')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();

        $this->addForeignKeys();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%apiTestHasScenario}}');
        $this->dropTable('{{%apiTestHasScenario_history}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m250929_092037_create_api_test_has_scenario cannot be reverted.\n";

        return false;
    }
    */
}
