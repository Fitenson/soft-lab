<?php
/* @var $page array */
?>
<div id="<?= Yii::$app->inertia->rootElementId ?>"
data-page='<?= json_encode($page, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>'>
</div>
