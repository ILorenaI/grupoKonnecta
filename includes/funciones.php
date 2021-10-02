<?php

foreach($_POST as $key=>$value) { $$key = $value; }
foreach($_GET as $key=>$value) { $$key = $value; }
foreach($_COOKIE as $key=>$value) { $$key = $value; }
foreach($_FILES as $key=>$value) { $$key = $value; }


$tsesion=3000;
$web="http://localhost/micuidado";


function redirigir($direccion,$mensaje,$adicional=''){
    print "<html><head><title></title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">
    <meta http-equiv=\"REFRESH\" content=\"0;url=$direccion?m=$mensaje&$adicional\"></HEAD></head><body bgcolor=\"#FFFFFF\" text=\"#000000\">
    </body></html> ";
    exit();

}

?>
