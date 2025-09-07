<?php

use yii\base\Event;
use yii\db\ActiveRecord;


Event::on(ActiveRecord::class, ActiveRecord::EVENT_BEFORE_INSERT, function ($event) {
    $modelname = get_class($event->sender);
    $PrimaryKey = $event->sender::primarykey()[0];
    $model = $event->sender;
    $model->$PrimaryKey = Yii::$app->db->createCommand('select UUID()')->queryScalar();

    $model->valid = ($model->valid === null) ? 1 : $model->valid;
    $model->_version = 1;
    $model->createdAt = strtotime('now');
    $model->createdBy = !empty(Yii::$app->user->id) ? Yii::$app->user->id : null;

    // echo '<pre>';
    // print_r($model);
    // die;
});


Event::on(ActiveRecord::class, ActiveRecord::EVENT_AFTER_INSERT, function ($event) {
    $action = Yii::$app->controller->action->id;
    $modelname = get_class($event->sender);

    if (!str_contains($modelname, 'History')) {
        $modelHistoryName = $modelname . "History";

        $attributes = $event->sender->attributes;
        $modelHistory = new $modelHistoryName;
        $modelHistory->load($attributes, '');

        $pk = $modelHistory::primaryKey();
        $primary_key = $pk[0];

        $modelHistory->$primary_key = Yii::$app->db->createCommand('select UUID()')->queryScalar();
        $modelHistory->action = 'NEW';
        if ($action == 'clone') {
            $modelHistory->action = 'CLONE';
        }

        $modelHistory->date_created = strtotime('now');
        $modelHistory->user_id = Yii::$app->user->id;

        $modelHistory->save(false);
    }
});


Event::on(ActiveRecord::class, ActiveRecord::EVENT_BEFORE_UPDATE, function ($event) {
    $PrimaryKey = $event->sender::primarykey()[0];
    $model = $event->sender;
    $model->updatedAt = strtotime('now');
    $model->updatedBy = Yii::$app->user->id;
    $model->_version += 1;
});


Event::on(ActiveRecord::class, ActiveRecord::EVENT_AFTER_UPDATE, function ($event) {
    $action = Yii::$app->controller->action->id;
    $modelname = get_class($event->sender);

    if (!str_contains($modelname, 'History')) {
        $modelHistoryName = $modelname . "History";

        $attributes = $event->sender->attributes;
        $modelHistory = new $modelHistoryName;
        $modelHistory->load($attributes, '');

        $pk = $modelHistory::primaryKey();
        $primary_key = $pk[0];

        $modelHistory->$primary_key = Yii::$app->db->createCommand('select UUID()')->queryScalar();
        $modelHistory->date_created = strtotime('now');
        $modelHistory->user_id = Yii::$app->user->id;

        $action = preg_replace('/[0-9]+/', '', strtoupper($action));

        if ($action == 'THROW') {
            $modelHistory->action = 'TRASH';
        } else if ($action == 'RESTORE') {
            $modelHistory->action = 'RESTORE';
        } else {
            $modelHistory->action = 'EDIT';
        }

        $modelHistory->save(false);
    }
});


Event::on(ActiveRecord::class, ActiveRecord::EVENT_AFTER_DELETE, function ($event) {
    $action = Yii::$app->controller->action->id;

    $modelname = get_class($event->sender);

    if (!str_contains($modelname, 'History')) {
        $modelHistoryName = $modelname . "History";

        $attributes = $event->sender->attributes;
        $modelHistory = new $modelHistoryName;
        $modelHistory->load($attributes, '');

        $pk = $modelHistory::primaryKey();
        $primary_key = $pk[0];

        $modelHistory->$primary_key = Yii::$app->db->createCommand('select UUID()')->queryScalar();
        $modelHistory->date_created = strtotime('now');
        $modelHistory->user_id = Yii::$app->user->id;
        $modelHistory->action = 'DELETE';
        $modelHistory->save(false);
    }
});
