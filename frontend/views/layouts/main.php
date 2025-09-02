<?php
/** @var array $page */

use frontend\assets\InertiaAsset;

InertiaAsset::register($this);
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Main Layout</title>
</head>
<body> 
    <!-- Your Vite entry build -->
    <script type="module" src="/dist/main.js"></script>
</body>
</html>
