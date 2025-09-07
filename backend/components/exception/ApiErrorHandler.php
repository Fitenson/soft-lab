<?php

namespace backend\components\exception;

use Yii;
use yii\web\ErrorHandler;


class ApiErrorHandler extends ErrorHandler
{
    protected function renderException($exception)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if ($exception instanceof ApiException) {
            Yii::$app->response->statusCode = $exception->getCode() ?: 500;
            Yii::$app->response->data = $exception->payload;
        } else {
            Yii::$app->response->statusCode = 500;
            Yii::$app->response->data = [
                'name' => 'Internal Server Error',
                'message' => $exception->getMessage(),
                'statusCode' => 500,
            ];
        }

        Yii::$app->response->send();
    }
}
