-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5280
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla contactos.contactos
CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla contactos.contactos: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` (`id`, `nombre`, `telefono`) VALUES
	(1, 'Alguien', '123456'),
	(2, 'Otro Alguien', '300484'),
	(9, 'Juanito', '45678'),
	(10, 'Un Humano', '12348'),
	(12, 'The Godfather', '15987'),
	(13, 'La Family', '30050'),
	(16, 'Andrés', '4682');
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
