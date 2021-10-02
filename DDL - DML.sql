-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-10-2021 a las 02:39:08
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

CREATE DATABASE inventarioss;
use inventarioss;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` varchar(100) NOT NULL,
  `Referencia` varchar(200) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Peso` int(11) NOT NULL,
  `Categoria` varchar(150) NOT NULL,
  `Stock` int(11) NOT NULL,
  `ENTERO` varchar(150) NOT NULL,
  `Fecha_creacion` date NOT NULL DEFAULT current_timestamp(),
  `Fecha_ult_venta` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de productos';

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `Nombre`, `Referencia`, `Precio`, `Peso`, `Categoria`, `Stock`, `ENTERO`, `Fecha_creacion`, `Fecha_ult_venta`) VALUES
(1, 'PRODUCTO 1', 'abc123', 45000, 15, 'desechables', 5, 'si', '2021-10-01', '0000-00-00'),
(2, 'Producto2', 'DFG456', 5000, 85, 'CAT25', 45, 'NO', '2021-10-01', '2021-10-01');

--
-- Índices para tablas volcadas
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Procedimientos
--
CREATE PROCEDURE `ActualizarProducto` (IN `ID_PRODUCTO` INT, IN `p_Nombre` VARCHAR(200), IN `p_Referencia` VARCHAR(200), IN `p_Precio` INT, IN `p_Peso` INT, IN `p_Categoria` VARCHAR(200), IN `p_Stock` INT, IN `p_ENTERO` VARCHAR(200))  update productos
    set Nombre = p_Nombre
      ,Referencia = p_Referencia
      ,Precio = p_Precio
      ,Peso = p_Peso
      ,Categoria = p_Categoria
      ,Stock = p_Stock
      ,ENTERO = p_ENTERO
    WHERE ID = ID_PRODUCTO;


CREATE PROCEDURE `BorrarProducto` (IN `ID_PRODUCTO` INT)  
    DELETE
    FROM productos
    WHERE ID = ID_PRODUCTO;


CREATE PROCEDURE `ConsultarProducto` (IN `ID_PRODUCTO` INT)  
    SELECT * 
    FROM productos
    WHERE ID = ID_PRODUCTO;


CREATE PROCEDURE `InsertarProducto` (IN `p_Nombre` VARCHAR(200), IN `p_Referencia` VARCHAR(200), IN `p_Precio` INT, IN `p_Peso` INT, IN `p_Categoria` VARCHAR(200), IN `p_Stock` INT, IN `p_ENTERO` VARCHAR(200))  
   INSERT INTO `productos` ( `Nombre`, `Referencia`, `Precio`, `Peso`, `Categoria`, `Stock`, `ENTERO`, `Fecha_creacion`, `Fecha_ult_venta`) VALUES ( p_Nombre, p_Referencia, p_Precio, p_Peso, p_Categoria, p_Stock, p_ENTERO, current_timestamp(), current_timestamp());

CREATE PROCEDURE `VendeProducto` (IN `ID_PRODUCTO` INT, IN `FECHA_VENTA` DATE)  
    update productos
    set Stock = Stock - 1
       ,Fecha_ult_venta = FECHA_VENTA
  WHERE ID = ID_PRODUCTO
    AND Stock > 0;


