<?php
/* @var $page array */
use yii\helpers\Html;

?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>My Inertia App</title>

    <!-- Point to your Vite dev/build entry -->
<?= \frontend\assets\Vite::asset('src/main.tsx') ?>
    <!-- <script type="module" src="<?= Yii::getAlias('@web/dist/assets/main-Bf3bLX_9.js') ?>"></script>
    <link rel="stylesheet" href="<?= Yii::getAlias('@web/dist/assets/main-mDA5p18I.css') ?>"> -->
</head>
<body>
    <div id="<?= Yii::$app->get('inertia')->rootElementId ?>"
         data-page="<?= htmlspecialchars(json_encode($page), ENT_QUOTES, 'UTF-8') ?>"></div>
</body>
</html>
