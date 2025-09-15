<?php

use backend\components\db\DbMigration;


class m130524_201442_init extends DbMigration
{
    public function up()
    {
        $tableOptions = $this->tableOptions;
        // if ($this->db->driverName === 'mysql') {
        //     $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        // }

        // Create main user table
        $this->createTable('{{%user}}', array_merge([
            'UUID' => $this->char(50)->notNull()->append('PRIMARY KEY')->unique(),
            'username' => $this->string(100)->notNull()->unique(),
            'email' => $this->string(100)->notNull()->unique(),
            'fullName' => $this->string(255),
            'role' => $this->string(50)->null(),
            'profileImage' => $this->string(255)->null(),
            'gender' => $this->string(50),
            'title' => $this->string(50),
            'phoneNo' => $this->string(100),
            'description' => $this->string(500),
            'address' => $this->string(500),
            'accessToken' => $this->string(500)->null(),
            'authKey' => $this->string(32)->notNull(),
            'passwordHash' => $this->string()->notNull(),
            'passwordResetToken' => $this->string()->unique(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        // Create user_history table (no foreign keys)
        $this->createTable('{{%user_history}}', array_merge([
            'historyUUID' => $this->char(50)->notNull()->append('PRIMARY KEY'),
            'UUID' => $this->char(50)->notNull(),
            'username' => $this->string(100)->notNull(),
            'fullName' => $this->string(255),
            'profileImage' => $this->string(255)->null(),
            'gender' => $this->string(50),
            'title' => $this->string(50),
            'phoneNo' => $this->string(100),
            'description' => $this->string(500),
            'address' => $this->string(500),
            'accessToken' => $this->string(500)->null(),
            'authKey' => $this->string(32)->notNull(),
            'passwordHash' => $this->string()->notNull(),
            'passwordResetToken' => $this->string(),
            'email' => $this->string(100)->notNull(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);

        // Add only the self-referencing foreign keys
        $this->createForeignKey()
            ->table('user')
            ->column('createdBy')
            ->refTable('user')
            ->refColumn('UUID')
            ->onDeleteNull()
            ->build();

        $this->createForeignKey()
            ->table('user')
            ->column('updatedBy')
            ->refTable('user')
            ->refColumn('UUID')
            ->onDeleteNull()
            ->build();

        $this->addForeignKeys();
    }

    public function down()
    {
        $this->dropTable('{{%user_history}}');
        $this->dropTable('{{%user}}');
    }
}
