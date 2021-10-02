<?php
error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE);
date_default_timezone_set("America/Bogota");		
include('./includes/conexion-mysql.php');
include('./includes/FastTemplate.php');
include('./includes/funciones.php');

$templete = new FastTemplate('./plantillas/producto');

/*
Lista los productos
@id		    Identificador del producto
@operacion	Accion a realizar en el producto
*/
if(!$id && !$operacion)
{
	$templete->define(array('principal' => 'producto_listar.html'));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    $c = $conexion->numRows("SELECT * FROM productos");
    $data = $conexion->getData("SELECT * FROM productos");
    $conexion->close();
    $templete->assign('TOTAL_PRODUCTOS',$c);
    

    $templete->define(array('principal' => 'producto_listar.html'));

    $templete->define_dynamic('PRODUCTOS', 'principal');
    foreach ($data as $producto){
        $templete->assign('REFERENCIA',$producto['Referencia']);
        $templete->assign('STOCK',$producto['Stock']);
        $templete->assign('NOMBRE',$producto['Nombre']);
        $templete->assign('PRECIO',$producto['Precio']);
        $templete->assign('CATEGORIA',$producto['Categoria']);
        $templete->assign('ID',base64_encode($producto['id']."Konnecta"));

        $templete->assign('DISPLAY_VENDER','');
        
        if($producto['Stock'] == 0){
            $templete->assign('DISPLAY_VENDER','display:none');
        }

        $templete->parse('LISTAPRODUCTOS', '.PRODUCTOS');
        
    }

}

/*
Inicializacion de los productos debe recibir los parametros o sera redirigido
@id		    Identificador del producto
@operacion	Accion a realizar en el producto
*/
if($id && !$operacion)
//Mostrar producto no encontrado
{
	$templete->define(array('principal' => 'producto_listar.html'));
	$mensaje = 'El producto al que está intentando ingresar no se encuentra disponible.'.$m;

    redirigir('producto.php',$mensaje);
}

/*
Ver Formulario para Diligenciar
@id		    Identificador del producto
@operacion	Accion a realizar en formularios == VER
*/
if($operacion == 'VER' )
{
    $templete->define(array('principal' => 'producto_ver.html'));

    $id = str_replace("Konnecta","",base64_decode($id));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    $data = $conexion->getData("SELECT * FROM productos WHERE id=$id");
    $conexion->close();

    $templete->assign('ACTION','ACTUALIZAR');

    foreach ($data as $producto){
        $templete->assign('REFERENCIA',$producto['Referencia']);
        $templete->assign('STOCK',$producto['Stock']);
        $templete->assign('NOMBRE',$producto['Nombre']);
        $templete->assign('PRECIO',$producto['Precio']);
        $templete->assign('CATEGORIA',$producto['Categoria']);
        $templete->assign('PESO',$producto['Peso']);
        $templete->assign('ID',base64_encode($producto['id']."Konnecta"));
    }

    $templete->assign('READONLY','readonly');
}


if($operacion == 'CREAR' )
{
    $templete->define(array('principal' => 'producto_ver.html'));

    $templete->assign('ACTION','INSERTAR');
    $templete->assign('DISPLAY_EDIT','display:none');
    $templete->assign('BTN','<div  style="margin: 2em 0" class="col-sm-12"><input type="submit" class="btn btn-success" value="Enviar"></div>');

}


if($operacion == 'DRP' )
{
    $id = str_replace("Konnecta","",base64_decode($id));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    
    $data = $conexion->executeInstruction("CALL BorrarProducto($id); ");
    $conexion->close();
    $mensaje = "Se ha eliminado el producto No. $id satisfactorimente.";
    redirigir('producto.php',$mensaje,'');

}

/*
Actualiza Producto
@id		    Identificador del producto
@operacion	Accion a realizar en formularios == ACTUALIZAR
*/
if($operacion=='ACTUALIZAR')
{
    $id = str_replace("Konnecta","",base64_decode($id));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    
    $data = $conexion->executeInstruction("CALL ActualizarProducto($id
                                                                  ,'$nombre'
                                                                  ,'$referencia'
                                                                  ,$precio
                                                                  ,$peso
                                                                  ,'$categoria'
                                                                  ,$stock
                                                                  ,'1');    ");
    $conexion->close();
    $mensaje = "Se ha actualizado el producto No. $id -> $nombre satisfactorimente.";
    redirigir('producto.php',$mensaje,'');

}


/*
Inserta Producto
@id		    Identificador del producto
@operacion	Accion a realizar */
if($operacion=='INSERTAR')
{
    $id = str_replace("Konnecta","",base64_decode($id));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    
    $data = $conexion->executeInstruction("CALL InsertarProducto('$nombre'
                                                                  ,'$referencia'
                                                                  ,$precio
                                                                  ,$peso
                                                                  ,'$categoria'
                                                                  ,$stock
                                                                  ,'1');    ");
    $conexion->close();
    $mensaje = "Se ha creado el producto $nombre satisfactorimente.";
    redirigir('producto.php',$mensaje,'');

}

/*
Actualiza Producto de Venta
@id		    Identificador del producto
@operacion	Accion a realizar 
*/
if($operacion=='VND')
{
    $id = str_replace("Konnecta","",base64_decode($id));

    $conexion = new MySQLDB ("localhost","root","","inventario");
    $conexion->connect();
    $hoy = date("Y-m-d",time());
    $data = $conexion->executeInstruction("CALL VendeProducto ($id
                                                              ,$hoy);    ");
    $conexion->close();
    $mensaje = "Se ha vendido el producto No. $id satisfactorimente.";
    redirigir('producto.php',$mensaje,'');

}




if($m)$templete->assign('DISPLAY',"");
else $templete->assign('DISPLAY',"display:none");
$templete->assign('MENSAJE',$m);
$templete->assign('FECHA_ACTUAL',date('d/m/Y H:i',time()));
$templete->parse('PRINCIPAL', 'principal');
$templete->FastPrint('PRINCIPAL');
?>