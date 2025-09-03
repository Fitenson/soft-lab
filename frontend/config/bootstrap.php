<?php

require __DIR__ . './../routes/auth/auth_route.php';

Yii::$app->urlManager->addRules(Yii::$app->router->all(), false);
