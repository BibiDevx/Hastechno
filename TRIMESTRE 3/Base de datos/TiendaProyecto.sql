-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2024 a las 04:17:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrativo`
--

CREATE TABLE `administrativo` (
  `idAdministrativo` int(11) NOT NULL COMMENT 'numero con el que se identificara al administrativo',
  `idUsuario` int(11) NOT NULL COMMENT 'numero con el que se identificara el usuario que es',
  `nombreAdministrativo` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre del administrativo',
  `correoAdministrativo` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el correo del administrativo ',
  `telefonoAdministrativo` bigint(12) NOT NULL COMMENT 'numero con el que se identificara el telefono del administrativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrativo`
--

INSERT INTO `administrativo` (`idAdministrativo`, `idUsuario`, `nombreAdministrativo`, `correoAdministrativo`, `telefonoAdministrativo`) VALUES
(1, 2, 'miguel a', 'miguela@gmail.com', 3216546544),
(2, 2, 'miguel b', 'miguelb@gmail.com', 3216546556);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL COMMENT 'numero con el que se identificara la categoria',
  `nombreCategoria` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre de la categoria'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'perifericos'),
(2, 'monitores'),
(3, 'procesadores'),
(4, 'ventiladores'),
(5, 'tarjetas'),
(6, 'almacenamiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriaproducto`
--

CREATE TABLE `categoriaproducto` (
  `idCategoria` int(11) NOT NULL COMMENT 'numero con el que se identificara la categoria',
  `idProducto` int(11) NOT NULL COMMENT 'numero con el que se identificara el producto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoriaproducto`
--

INSERT INTO `categoriaproducto` (`idCategoria`, `idProducto`) VALUES
(1, 6),
(1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL COMMENT 'numero con el que se identificara el cliente',
  `idUsuario` int(11) NOT NULL COMMENT 'numero con el que se identificara para saber que tipo de usuario es',
  `nombreCliente` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre del cliente',
  `correoCliente` varchar(50) NOT NULL COMMENT 'cadena de caracteres que identificara el correo del cliente ',
  `claveCliente` varchar(10) NOT NULL COMMENT 'cadena de caracteres que identificara la clave para el ingreso del cliente ',
  `telefonoCliente` bigint(12) NOT NULL COMMENT 'numero con el que se identificara el numero telefonico',
  `direccionCliente` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara la direccion del cliente '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `idUsuario`, `nombreCliente`, `correoCliente`, `claveCliente`, `telefonoCliente`, `direccionCliente`) VALUES
(1, 3, 'juan', 'juan@gmail.com', 'sdvsd', 3176784973, 'cra12#12-34c-26'),
(2, 3, 'vanesa', 'vanesa@gmaill.com', 'password', 3176784963, 'cra12#12-34c-26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(11) NOT NULL COMMENT 'numero con el que se identificara la factura',
  `idPedido` int(11) NOT NULL COMMENT 'numero con el que se identificara el pedido',
  `fechaFactura` date NOT NULL COMMENT 'fecha en la que fue hecha la factura'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `idPedido`, `fechaFactura`) VALUES
(1, 1, '2024-05-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL COMMENT 'numero con el que se identificara el pedido',
  `idCliente` int(11) NOT NULL COMMENT 'numero con el que se identificara el usuario cliente',
  `fechaPedido` date NOT NULL COMMENT 'fecha de cuando fue hecho el pedido '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `idCliente`, `fechaPedido`) VALUES
(1, 1, '2024-05-28'),
(2, 2, '2024-05-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoproducto`
--

CREATE TABLE `pedidoproducto` (
  `idProducto` int(11) NOT NULL COMMENT 'numero con el que se identificara el producto',
  `idPedido` int(11) NOT NULL COMMENT 'numero con el que se identificara el pedido',
  `cantidadProducto` int(11) NOT NULL COMMENT 'numero que determinara cuantos productos son',
  `valorTotal` int(11) NOT NULL COMMENT 'numero con el que determinara el valor del pedido'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidoproducto`
--

INSERT INTO `pedidoproducto` (`idProducto`, `idPedido`, `cantidadProducto`, `valorTotal`) VALUES
(7, 1, 1, 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL COMMENT 'numero con el que se identificara el producto',
  `nombreProducto` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre del producto',
  `definicionProducto` text NOT NULL COMMENT 'caja de texto que proporcionara informacion sobre el producto',
  `valorProducto` int(11) NOT NULL COMMENT 'numero con el que se proporciona el valor del producto',
  `idProveedor` int(11) NOT NULL COMMENT 'numero con el que se identificara el proveedor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `definicionProducto`, `valorProducto`, `idProveedor`) VALUES
(1, 'memoria', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 120000, 1),
(3, 'fuente de poder', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 400000, 1),
(4, 'monitor', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 120000, 1),
(5, 'disco duro', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 80000, 1),
(6, 'mouse', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 40000, 1),
(7, 'teclado', 'La memoria de acceso aleatorio es una memoria de almacenaje a corto plazo. El sistema operativo de ordenadores u otros dispositivos utiliza la memoria RAM para guardar de forma temporal todos los programas y sus procesos de ejecución.', 50000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `idProveedor` int(11) NOT NULL COMMENT 'numero con el que se identificara el proveedor',
  `nombreProveedor` varchar(25) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre del proveedor',
  `correoProveedor` varchar(50) NOT NULL COMMENT 'adena de caracteres que identificara el correo del proveedor ',
  `telefonoProveedor` bigint(12) NOT NULL COMMENT 'numero con el que se identificara el telefono del proveedor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProveedor`, `nombreProveedor`, `correoProveedor`, `telefonoProveedor`) VALUES
(1, 'compSAS', 'sas@gmail.com', 3123456975);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL COMMENT 'numero con el que se identificara el tipo de usuario que es',
  `rolUsuario` varchar(20) NOT NULL COMMENT 'cadena de caracteres que identificara el nombre del usuario que es'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `rolUsuario`) VALUES
(1, 'Administrador'),
(2, 'Administrativo'),
(3, 'Cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrativo`
--
ALTER TABLE `administrativo`
  ADD PRIMARY KEY (`idAdministrativo`),
  ADD KEY `FKidUser` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `categoriaproducto`
--
ALTER TABLE `categoriaproducto`
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`) USING BTREE,
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `FKidUser` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD UNIQUE KEY `FKpedido` (`idPedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD UNIQUE KEY `FKidCliente` (`idCliente`);

--
-- Indices de la tabla `pedidoproducto`
--
ALTER TABLE `pedidoproducto`
  ADD UNIQUE KEY `FKproducto` (`idProducto`),
  ADD UNIQUE KEY `FKpedido` (`idPedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `FKproveedor` (`idProveedor`) USING BTREE;

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrativo`
--
ALTER TABLE `administrativo`
  MODIFY `idAdministrativo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara al administrativo', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara la categoria', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara el cliente', AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara la factura', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara el pedido', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara el producto', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara el proveedor', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT COMMENT 'numero con el que se identificara el tipo de usuario que es', AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrativo`
--
ALTER TABLE `administrativo`
  ADD CONSTRAINT `administrativo_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categoriaproducto`
--
ALTER TABLE `categoriaproducto`
  ADD CONSTRAINT `categoriaproducto_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categoriaproducto_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidoproducto`
--
ALTER TABLE `pedidoproducto`
  ADD CONSTRAINT `pedidoproducto_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidoproducto_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
