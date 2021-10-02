<?php
error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE);
include('./includes/funciones.php');
include('./includes/FastTemplate.php');

$templete = new FastTemplate('./plantillas/');


if(!$operacion)
{
	$templete->define(array('principal' => 'login.html'));
}


if($m)$templete->assign('DISPLAY',"");
else $templete->assign('DISPLAY',"display:none");
$templete->assign('MENSAJE',$m);
$templete->parse('PRINCIPAL', 'principal');
$templete->FastPrint('PRINCIPAL');
?>