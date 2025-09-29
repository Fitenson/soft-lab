<?php

use backend\components\db\DbMigration;


class m250929_085023_create_api_test_has_data extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%apiTestHasData}}', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'apiTest' => $this->char(40)->notNull(),
            'fieldType' => $this->string(100)->notNull(),
            'key' => $this->string(100)->null(),
            'value' => $this->text()->null(),
            'enabled' => $this->smallInteger()->notNull(),
            'description' => $this->string(500)->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);

        $this->createTable('{{%apiTestHasData_history}}', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'apiTest' => $this->char(40)->notNull(),
            'fieldType' => $this->string(100)->notNull(),
            'key' => $this->string(100)->null(),
            'value' => $this->text()->null(),
            'enabled' => $this->smallInteger()->notNull(),
            'description' => $this->string(500)->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);


        $this->createForeignKey()
        ->table('apiTestHasData')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasData')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasData')
        ->column('apiTest')
        ->refTable('apiTest')
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
        $this->dropTable('{{%apiTestHasData}}');
        $this->dropTable('{{%apiTestHasData_history}}');

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m250929_085023_create_api_test_has_data cannot be reverted.\n";

        return false;
    }
    */
}
