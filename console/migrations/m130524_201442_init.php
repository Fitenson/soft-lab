<?php

use backend\components\db\DbMigration;


class m130524_201442_init extends DbMigration
{
    public function up()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // https://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%user}}', [
            'UUID' => $this->char(50)->notNull()->append('PRIMARY KEY'),
            'username' => $this->string(100)->notNull()->unique(),
            'fullName' => $this->string(255)->null(),
            'gender' => $this->string(50)->null(),
            'title' => $this->string(50)->null(),
            'phoneNo' => $this->string(100)->null(),
            'description' => $this->string(500)->null(),
            'address' => $this->string(500)->null(),
            'authKey' => $this->string(32)->notNull(),
            'passwordHash' => $this->string()->notNull(),
            'passwordResetToken' => $this->string()->unique(),
            'email' => $this->string(100)->notNull()->unique(),

            'valid' => $this->boolean(),
            '_actionUUID' => $this->string(50)->null(),
            '_version' => $this->integer(),
            'createdAt' => $this->string(50)->null(),
            'updatedAt' => $this->string(50)->null(),
            'createdBy' => $this->string(50)->null(),
            'updatedBy' => $this->string(50)->null(),
        ], $tableOptions);

        $this->createForeignKey()->table('user')->column('createdBy')->refTable('user')->refColumn('id')->onDeleteNull()->build();
        $this->createForeignKey()->table('user')->column('updatedBy')->refTable('user')->refColumn('id')->onDeleteNull()->build();

        $this->addForeignKeys();

        $this->createTable('{{%user_history}}', [
            'historyUUID' => $this->char(50)->notNull()->append('PRIMARY KEY'),
            'UUID' => $this->string(50)->null(),
            'username' => $this->string(100)->notNull()->unique(),
            'fullName' => $this->string(255)->null(),
            'gender' => $this->string(50)->null(),
            'title' => $this->string(50)->null(),
            'phoneNo' => $this->string(100)->null(),
            'description' => $this->string(500)->null(),
            'address' => $this->string(500)->null(),
            'authKey' => $this->string(32)->notNull(),
            'passwordHash' => $this->string()->notNull(),
            'passwordResetToken' => $this->string()->unique(),
            'email' => $this->string(100)->notNull()->unique(),

            'valid' => $this->boolean(),
            '_actionUUID' => $this->string(50)->null(),
            '_version' => $this->integer(),
            'createdAt' => $this->string(50)->null(),
            'updatedAt' => $this->string(50)->null(),
            'createdBy' => $this->string(50)->null(),
            'updatedBy' => $this->string(50)->null(),
            'user_id' => $this->string(50)->null(),
            'action' => $this->string(50)->null(),
            'date_created' => $this->string(50)->null(),
        ], $tableOptions);
    }

    public function down()
    {
        $this->dropTable('{{%user}}');
    }
} 
