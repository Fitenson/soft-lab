<?php

use backend\components\db\DbMigration;


class m250918_222605_create_client_database extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('client_database', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'databaseName' => $this->string(50)->notNull()->unique(),
            'databaseSchema' => $this->string(50)->notNull()->unique(),
            'host' => $this->string(50)->notNull(),
            'port' => $this->string(50)->notNull(),
            'username'=> $this->string(50)->notNull(),
            'password'=> $this->string(50)->notNull(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('client_database_history', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'databaseName' => $this->string(50)->notNull(),
            'databaseSchema' => $this->string(50)->notNull(),
            'host' => $this->string(50)->notNull(),
            'port' => $this->string(50)->notNull(),
            'username'=> $this->string(50)->notNull(),
            'password'=> $this->string(50)->notNull(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%client_database}}');
        $this->dropTable('{{%client_database_history}}');
    }
}
