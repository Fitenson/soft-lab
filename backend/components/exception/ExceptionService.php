<?php

namespace backend\components\exception;

use Yii;
use yii\base\Component;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use yii\web\UnauthorizedHttpException;
use yii\web\UnprocessableEntityHttpException;


class ExceptionService extends Component
{
    /**
     * Throw a mapped exception based on HTTP status code.
     *
     * @param string|array $message
     * @param int    $statusCode
     * @throws \Throwable
     */
    public function throw($error, ?int $statusCode): void
    {
        switch($statusCode) {
            case 400:
                $name = 'Bad Request';
                break;

            case 401:
                $name = 'Unauthorized';
                break;

            case 404:
                $name = 'Not Found';
                break;

            case 422:
                $name = 'UnprocessableEntity Entity';
                break;

            default:
                $name = 'Internal Server';
                $statusCode = 500;
        }

        Yii::$app->response->statusCode = $statusCode;

        $payload = [
            'name' => $name,
            'errors' => $error,
            'statusCode' => $statusCode
        ];

        throw new ApiException($payload, $statusCode);
        
        // return [
        //     'name' => $name,
        //     'errors' => $error,
        //     'statusCode' => $statusCode
        // ];
    }
}
