-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: utilities
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calculators`
--

DROP TABLE IF EXISTS `calculators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calculators` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `people_id` bigint(20) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `serial_number` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `deleted` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_id` (`type_id`,`serial_number`),
  KEY `people_id` (`people_id`),
  CONSTRAINT `calculators_ibfk_1` FOREIGN KEY (`people_id`) REFERENCES `peoples` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `calculators_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calculators`
--

LOCK TABLES `calculators` WRITE;
/*!40000 ALTER TABLE `calculators` DISABLE KEYS */;
INSERT INTO `calculators` VALUES (1,11,1,'123456789','sadfd','0'),(2,12,3,'987654321','sdsd','0'),(3,8,3,'3	8	2	951357893	dfdsfsd	0','3	8	2	951357893	dfdsfsd	0','0'),(4,6,3,'753159753','mhjg','0'),(6,10,1,'957135795','bnnbn','0'),(7,9,3,'359751359','hasdds','0'),(8,8,2,'234324324','ewwew','0');
/*!40000 ALTER TABLE `calculators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peoples`
--

DROP TABLE IF EXISTS `peoples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peoples` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `l_name` varchar(250) NOT NULL,
  `m_name` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `passport` char(9) NOT NULL,
  `region_id` tinyint(4) DEFAULT NULL,
  `address` varchar(250) NOT NULL,
  `deleted` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `passport` (`passport`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peoples`
--

LOCK TABLES `peoples` WRITE;
/*!40000 ALTER TABLE `peoples` DISABLE KEYS */;
INSERT INTO `peoples` VALUES (6,'Gexam','Poxosyan','Gurgeni','+37498649751','AP7856321',1,'Vazgen Sargsyan','0'),(8,'Artur','Nalbandyan','Gevorgi','+374-943-126-42','AP2546987',3,'Xachik Dashtenc','0'),(9,'Ararat','Hovhannisyan','Karoyi','+374-77-24-08-02','AP1964873',5,'St Lalayan 139/2','0'),(10,'Hayk ','Bernetsyan','Artaki','+374-98-57-80-29','AP1974873',8,'Timiryazev 18','0'),(11,'Anahit','Grigoryan','Arayi','+37495698748','AP9876541',5,'Vardan Achemyan','0'),(12,'Vardan','Balasanyan','Mamveli','+374-94-85-96-78','AP9874563',9,'Tumanyan Sevyan Nalbandyan','0');
/*!40000 ALTER TABLE `peoples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Shirak'),(2,'Ararat'),(3,'Lori'),(4,'Tavush'),(5,'Gexarquniq'),(6,'Vayoc Dzor'),(7,'Kotayq'),(8,'Syuniq'),(9,'Armavir'),(10,'Aragacotn'),(11,'Erevan');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `short_name` varchar(50) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'Վեոլիա Ջուր','Վ_Ջուր','м³',48),(2,'Գազպրոմ Արմենիա','Գազ_Արմ','м³',163),(3,'Հայաստանի էլեկտրական ցանցեր','Հայ_Էլ_Ցանց','kWh',52);
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `people_id` varchar(255) NOT NULL,
  `role` enum('admin','manager','payer') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Artur','c9b5ecdf0b853aab02103542187ea208','nalbandyan.artur@gmail.com','8','admin'),(2,'Hayk','b66b5229b2a69f7c8a1db36f1cfadfc4','bernetsyan.hayk','10','manager'),(3,'Anahit','290ff80f47a6e4f2bf0be72deaa96bce','grigoryan.anahit@gmail.com','11','payer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilites`
--

DROP TABLE IF EXISTS `utilites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilites` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `number` bigint(20) DEFAULT NULL,
  `debt` bigint(20) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `pay_date` varchar(255) DEFAULT NULL,
  `paid_price` bigint(20) DEFAULT NULL,
  `create_user_id` bigint(20) DEFAULT NULL,
  `payed_user_id` bigint(20) DEFAULT NULL,
  `calc_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilites`
--

LOCK TABLES `utilites` WRITE;
/*!40000 ALTER TABLE `utilites` DISABLE KEYS */;
INSERT INTO `utilites` VALUES (30,1,-7101,'2019-06-28T20:01:46.386Z','2019-06-28T23:56:58.119Z',2001,3,11,8),(31,3,-7101,'2019-06-28T20:01:52.572Z','2019-06-28T23:56:58.119Z',2001,3,11,8);
/*!40000 ALTER TABLE `utilites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'utilities'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-30  4:26:00
