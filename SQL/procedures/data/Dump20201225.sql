-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: PUBLICATION
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AUTHOR`
--

DROP TABLE IF EXISTS `AUTHOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AUTHOR` (
  `S_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`S_ID`),
  CONSTRAINT `author_ibfk_1` FOREIGN KEY (`S_ID`) REFERENCES `SCIENTIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AUTHOR`
--

LOCK TABLES `AUTHOR` WRITE;
/*!40000 ALTER TABLE `AUTHOR` DISABLE KEYS */;
INSERT INTO `AUTHOR` VALUES ('laivansam'),('ledinhthuan');
/*!40000 ALTER TABLE `AUTHOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK`
--

DROP TABLE IF EXISTS `BOOK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOOK` (
  `ISBN` varchar(45) NOT NULL,
  `PAGE_COUNT` int DEFAULT NULL,
  `PUBLISH_YEAR` year DEFAULT NULL,
  `TITLE` text,
  `PUBLISHER` text NOT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK`
--

LOCK TABLES `BOOK` WRITE;
/*!40000 ALTER TABLE `BOOK` DISABLE KEYS */;
INSERT INTO `BOOK` VALUES ('123',123,2020,'Title4','NXB 2'),('1234',123,2019,'Title5','NXB 1');
/*!40000 ALTER TABLE `BOOK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK_AUTHOR`
--

DROP TABLE IF EXISTS `BOOK_AUTHOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOOK_AUTHOR` (
  `ISBN` varchar(45) NOT NULL,
  `AUTHOR_NAME` varchar(45) NOT NULL,
  PRIMARY KEY (`ISBN`,`AUTHOR_NAME`),
  CONSTRAINT `book_author_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `BOOK` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK_AUTHOR`
--

LOCK TABLES `BOOK_AUTHOR` WRITE;
/*!40000 ALTER TABLE `BOOK_AUTHOR` DISABLE KEYS */;
/*!40000 ALTER TABLE `BOOK_AUTHOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK_REVIEW`
--

DROP TABLE IF EXISTS `BOOK_REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOOK_REVIEW` (
  `P_ID` varchar(45) NOT NULL,
  `ISBN` varchar(45) NOT NULL,
  PRIMARY KEY (`P_ID`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `book_review_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_review_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `BOOK` (`ISBN`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK_REVIEW`
--

LOCK TABLES `BOOK_REVIEW` WRITE;
/*!40000 ALTER TABLE `BOOK_REVIEW` DISABLE KEYS */;
INSERT INTO `BOOK_REVIEW` VALUES ('4','123'),('5','1234');
/*!40000 ALTER TABLE `BOOK_REVIEW` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CONTACT_AUTHOR`
--

DROP TABLE IF EXISTS `CONTACT_AUTHOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CONTACT_AUTHOR` (
  `S_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`S_ID`),
  CONSTRAINT `contact_author_ibfk_1` FOREIGN KEY (`S_ID`) REFERENCES `SCIENTIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONTACT_AUTHOR`
--

LOCK TABLES `CONTACT_AUTHOR` WRITE;
/*!40000 ALTER TABLE `CONTACT_AUTHOR` DISABLE KEYS */;
INSERT INTO `CONTACT_AUTHOR` VALUES ('vuhoanglan'),('vutrongphung');
/*!40000 ALTER TABLE `CONTACT_AUTHOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRITERIA`
--

DROP TABLE IF EXISTS `CRITERIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRITERIA` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CR_DESCRIPTION` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRITERIA`
--

LOCK TABLES `CRITERIA` WRITE;
/*!40000 ALTER TABLE `CRITERIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRITERIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CRITERIA_REVIEW`
--

DROP TABLE IF EXISTS `CRITERIA_REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CRITERIA_REVIEW` (
  `P_ID` varchar(45) NOT NULL,
  `REVIEWER_ID` varchar(45) NOT NULL,
  `CRITERIA_ID` int NOT NULL,
  `SENT_DATE` date NOT NULL,
  `REVIEW_CONTENT` text,
  `REVIEW_SCORE` int NOT NULL,
  PRIMARY KEY (`P_ID`,`REVIEWER_ID`,`CRITERIA_ID`),
  KEY `REVIEWER_ID` (`REVIEWER_ID`),
  KEY `CRITERIA_ID` (`CRITERIA_ID`),
  CONSTRAINT `criteria_review_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `REVIEWER_REVIEW_ASSIGNMENT` (`PAPER_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `criteria_review_ibfk_2` FOREIGN KEY (`REVIEWER_ID`) REFERENCES `REVIEWER_REVIEW_ASSIGNMENT` (`REVIEWER_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `criteria_review_ibfk_3` FOREIGN KEY (`CRITERIA_ID`) REFERENCES `CRITERIA` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CRITERIA_REVIEW`
--

LOCK TABLES `CRITERIA_REVIEW` WRITE;
/*!40000 ALTER TABLE `CRITERIA_REVIEW` DISABLE KEYS */;
/*!40000 ALTER TABLE `CRITERIA_REVIEW` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EDITOR`
--

DROP TABLE IF EXISTS `EDITOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EDITOR` (
  `S_ID` varchar(45) NOT NULL,
  `APPOINTED_DATE` date NOT NULL,
  PRIMARY KEY (`S_ID`),
  CONSTRAINT `editor_ibfk_1` FOREIGN KEY (`S_ID`) REFERENCES `SCIENTIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EDITOR`
--

LOCK TABLES `EDITOR` WRITE;
/*!40000 ALTER TABLE `EDITOR` DISABLE KEYS */;
INSERT INTO `EDITOR` VALUES ('lehongquang','2020-12-19'),('vubang','2020-12-19');
/*!40000 ALTER TABLE `EDITOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EDITOR_REVIEW_ASSIGNMENT`
--

DROP TABLE IF EXISTS `EDITOR_REVIEW_ASSIGNMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EDITOR_REVIEW_ASSIGNMENT` (
  `EDITOR_ID` varchar(45) NOT NULL,
  `PAPER_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`EDITOR_ID`,`PAPER_ID`),
  KEY `PAPER_ID` (`PAPER_ID`),
  CONSTRAINT `editor_review_assignment_ibfk_1` FOREIGN KEY (`EDITOR_ID`) REFERENCES `EDITOR` (`S_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `editor_review_assignment_ibfk_2` FOREIGN KEY (`PAPER_ID`) REFERENCES `REVIEW_ASSIGNMENT_DETAIL` (`P_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EDITOR_REVIEW_ASSIGNMENT`
--

LOCK TABLES `EDITOR_REVIEW_ASSIGNMENT` WRITE;
/*!40000 ALTER TABLE `EDITOR_REVIEW_ASSIGNMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `EDITOR_REVIEW_ASSIGNMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAPER`
--

DROP TABLE IF EXISTS `PAPER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAPER` (
  `ID` varchar(45) NOT NULL,
  `TITLE` text NOT NULL,
  `SUMMARY` text,
  `ASSOCIATED_FILE` text NOT NULL,
  `PAGE_COUNT` int NOT NULL,
  `SENT_BY` varchar(45) NOT NULL,
  `SENT_DATE` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `SENT_BY` (`SENT_BY`),
  CONSTRAINT `paper_ibfk_1` FOREIGN KEY (`SENT_BY`) REFERENCES `CONTACT_AUTHOR` (`S_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAPER`
--

LOCK TABLES `PAPER` WRITE;
/*!40000 ALTER TABLE `PAPER` DISABLE KEYS */;
INSERT INTO `PAPER` VALUES ('1','title_1','sumary1','file1',1,'vuhoanglan','2019-12-21'),('2','title_2','sumary2','file2',2,'vuhoanglan','2020-12-22'),('3','title_3','sumary3','file3',3,'vutrongphung','2020-12-21'),('4','title_4','sumary4','file4',4,'vutrongphung','2020-12-22'),('5','title_5','sumary5','file5',5,'vutrongphung','2020-12-23'),('6','title_6','sumary6','file6',6,'vutrongphung','2020-12-23');
/*!40000 ALTER TABLE `PAPER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAPER_AUTHORS`
--

DROP TABLE IF EXISTS `PAPER_AUTHORS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAPER_AUTHORS` (
  `P_ID` varchar(45) NOT NULL,
  `AUTHOR_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`P_ID`,`AUTHOR_ID`),
  KEY `AUTHOR_ID` (`AUTHOR_ID`),
  CONSTRAINT `paper_authors_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paper_authors_ibfk_2` FOREIGN KEY (`AUTHOR_ID`) REFERENCES `AUTHOR` (`S_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAPER_AUTHORS`
--

LOCK TABLES `PAPER_AUTHORS` WRITE;
/*!40000 ALTER TABLE `PAPER_AUTHORS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PAPER_AUTHORS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAPER_KEY_WORD`
--

DROP TABLE IF EXISTS `PAPER_KEY_WORD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAPER_KEY_WORD` (
  `P_ID` varchar(45) NOT NULL,
  `KEYWORD` varchar(45) NOT NULL,
  PRIMARY KEY (`P_ID`,`KEYWORD`),
  CONSTRAINT `paper_key_word_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAPER_KEY_WORD`
--

LOCK TABLES `PAPER_KEY_WORD` WRITE;
/*!40000 ALTER TABLE `PAPER_KEY_WORD` DISABLE KEYS */;
/*!40000 ALTER TABLE `PAPER_KEY_WORD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PUBLICATION_DETAIL`
--

DROP TABLE IF EXISTS `PUBLICATION_DETAIL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PUBLICATION_DETAIL` (
  `P_ID` varchar(45) DEFAULT NULL,
  `DOI` date NOT NULL,
  `OPEN_ACCESS` tinyint(1) NOT NULL DEFAULT '0',
  KEY `P_ID` (`P_ID`),
  CONSTRAINT `publication_detail_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PUBLICATION_DETAIL`
--

LOCK TABLES `PUBLICATION_DETAIL` WRITE;
/*!40000 ALTER TABLE `PUBLICATION_DETAIL` DISABLE KEYS */;
/*!40000 ALTER TABLE `PUBLICATION_DETAIL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH_OVERVIEW_PAPER`
--

DROP TABLE IF EXISTS `RESEARCH_OVERVIEW_PAPER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH_OVERVIEW_PAPER` (
  `P_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`P_ID`),
  CONSTRAINT `research_overview_paper_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH_OVERVIEW_PAPER`
--

LOCK TABLES `RESEARCH_OVERVIEW_PAPER` WRITE;
/*!40000 ALTER TABLE `RESEARCH_OVERVIEW_PAPER` DISABLE KEYS */;
INSERT INTO `RESEARCH_OVERVIEW_PAPER` VALUES ('1'),('2');
/*!40000 ALTER TABLE `RESEARCH_OVERVIEW_PAPER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESEARCH_PAPER`
--

DROP TABLE IF EXISTS `RESEARCH_PAPER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESEARCH_PAPER` (
  `P_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`P_ID`),
  CONSTRAINT `research_paper_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESEARCH_PAPER`
--

LOCK TABLES `RESEARCH_PAPER` WRITE;
/*!40000 ALTER TABLE `RESEARCH_PAPER` DISABLE KEYS */;
INSERT INTO `RESEARCH_PAPER` VALUES ('3');
/*!40000 ALTER TABLE `RESEARCH_PAPER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEW_ASSIGNMENT_DETAIL`
--

DROP TABLE IF EXISTS `REVIEW_ASSIGNMENT_DETAIL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEW_ASSIGNMENT_DETAIL` (
  `P_ID` varchar(45) NOT NULL,
  `REVIEWING_DATE` date NOT NULL,
  `NOTE` text,
  `INFORM_DATE` date DEFAULT NULL,
  `RESULT` enum('REJECTION','MINNOR_REVISION','MAJOR_REVISION','ACCEPTANCE') DEFAULT NULL,
  PRIMARY KEY (`P_ID`),
  CONSTRAINT `review_assignment_detail_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `PAPER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEW_ASSIGNMENT_DETAIL`
--

LOCK TABLES `REVIEW_ASSIGNMENT_DETAIL` WRITE;
/*!40000 ALTER TABLE `REVIEW_ASSIGNMENT_DETAIL` DISABLE KEYS */;
INSERT INTO `REVIEW_ASSIGNMENT_DETAIL` VALUES ('1','2029-12-24','note1_update','2020-12-25','REJECTION'),('2','2020-12-24','note2','2020-12-25','ACCEPTANCE'),('3','2020-12-24','note3','2020-12-25','REJECTION'),('4','2020-12-24','note4','2020-12-25','ACCEPTANCE'),('5','2020-12-24','note5','2020-12-25','REJECTION'),('6','2020-12-24','note6','2020-12-25',NULL);
/*!40000 ALTER TABLE `REVIEW_ASSIGNMENT_DETAIL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEW_SUMMARY`
--

DROP TABLE IF EXISTS `REVIEW_SUMMARY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEW_SUMMARY` (
  `P_ID` varchar(45) NOT NULL,
  `REVIEWER_ID` varchar(45) NOT NULL,
  `NOTE_FOR_AUTHOR` text,
  `NOTE_ABOUT_PAPER` text,
  PRIMARY KEY (`P_ID`,`REVIEWER_ID`),
  KEY `REVIEWER_ID` (`REVIEWER_ID`),
  CONSTRAINT `review_summary_ibfk_1` FOREIGN KEY (`P_ID`) REFERENCES `REVIEWER_REVIEW_ASSIGNMENT` (`PAPER_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_summary_ibfk_2` FOREIGN KEY (`REVIEWER_ID`) REFERENCES `REVIEWER_REVIEW_ASSIGNMENT` (`REVIEWER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEW_SUMMARY`
--

LOCK TABLES `REVIEW_SUMMARY` WRITE;
/*!40000 ALTER TABLE `REVIEW_SUMMARY` DISABLE KEYS */;
/*!40000 ALTER TABLE `REVIEW_SUMMARY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEWER`
--

DROP TABLE IF EXISTS `REVIEWER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEWER` (
  `S_ID` varchar(45) NOT NULL,
  `COLLABORATION_DATE` date NOT NULL,
  `WORK_EMAIL` text NOT NULL,
  PRIMARY KEY (`S_ID`),
  CONSTRAINT `reviewer_ibfk_1` FOREIGN KEY (`S_ID`) REFERENCES `SCIENTIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEWER`
--

LOCK TABLES `REVIEWER` WRITE;
/*!40000 ALTER TABLE `REVIEWER` DISABLE KEYS */;
INSERT INTO `REVIEWER` VALUES ('nnhhaadd_sci','2020-12-20','nhad@gmail.com'),('qttho','2020-12-20','qttho@gmail.com');
/*!40000 ALTER TABLE `REVIEWER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEWER_REVIEW_ASSIGNMENT`
--

DROP TABLE IF EXISTS `REVIEWER_REVIEW_ASSIGNMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEWER_REVIEW_ASSIGNMENT` (
  `REVIEWER_ID` varchar(45) NOT NULL,
  `PAPER_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`REVIEWER_ID`,`PAPER_ID`),
  KEY `PAPER_ID` (`PAPER_ID`),
  CONSTRAINT `reviewer_review_assignment_ibfk_1` FOREIGN KEY (`REVIEWER_ID`) REFERENCES `REVIEWER` (`S_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviewer_review_assignment_ibfk_2` FOREIGN KEY (`PAPER_ID`) REFERENCES `REVIEW_ASSIGNMENT_DETAIL` (`P_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEWER_REVIEW_ASSIGNMENT`
--

LOCK TABLES `REVIEWER_REVIEW_ASSIGNMENT` WRITE;
/*!40000 ALTER TABLE `REVIEWER_REVIEW_ASSIGNMENT` DISABLE KEYS */;
INSERT INTO `REVIEWER_REVIEW_ASSIGNMENT` VALUES ('qttho','1'),('qttho','2'),('qttho','3'),('nnhhaadd_sci','4'),('nnhhaadd_sci','5'),('nnhhaadd_sci','6');
/*!40000 ALTER TABLE `REVIEWER_REVIEW_ASSIGNMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scientist`
--

DROP TABLE IF EXISTS `scientist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scientist` (
  `ID` varchar(45) NOT NULL,
  `FNAME` text,
  `ADDRESS` text,
  `EMAIL` text,
  `COMPANY` text,
  `JOB` text,
  `DEGREE` text,
  `PROFESSION` text,
  `HASHED_PASS` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scientist`
--

LOCK TABLES `scientist` WRITE;
/*!40000 ALTER TABLE `scientist` DISABLE KEYS */;
INSERT INTO `scientist` VALUES ('laivansam','Lai Van Sam','PhuTho','samlai@gmail.com','VTV','Reporter','Master','Literature','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('ledinhthuan','Le Dinh Thuan','HCMUT','thuanle@gmail.com','BKU','Dev','Master','Programming','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('lehongquang','Le Hong Quang','Thuong tru tai Nga','lhq@gmail.com','VTV','Reporter','Master','Literature','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('nnhhaadd_sci','nguyen huu anh dai','add','nnhhaadd@gmail.com','com','none','none','none','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('qttho','Quan Thanh Tho','HCMUT','thoquan@gmail.com','BKU','Dev','Professor','Science','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('vubang','Vu Bang','Saigon','bangvu@gmail.com','SGK','Writer','master','Literature','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('vuhoanglan','Vu Hoang Lan','Little Saigon','lanvu@gmail.com','PhoBolsaTV','Reporter','Master','Literature','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa'),('vutrongphung','Vu Trong Phung','HaNoi','phungvu@gmail.com','SGK','Writer','Master','Literature','$2b$10$IkG2bVqPeWfC8aSjxzMpO..SIG79ioWsKQUhEiMdzBbHnlW4pPiBa');
/*!40000 ALTER TABLE `scientist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SCIENTIST_PHONE_NUMBER`
--

DROP TABLE IF EXISTS `SCIENTIST_PHONE_NUMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCIENTIST_PHONE_NUMBER` (
  `S_ID` varchar(45) NOT NULL,
  `PHONE_NUM` varchar(45) NOT NULL,
  PRIMARY KEY (`S_ID`,`PHONE_NUM`),
  CONSTRAINT `scientist_phone_number_ibfk_1` FOREIGN KEY (`S_ID`) REFERENCES `SCIENTIST` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SCIENTIST_PHONE_NUMBER`
--

LOCK TABLES `SCIENTIST_PHONE_NUMBER` WRITE;
/*!40000 ALTER TABLE `SCIENTIST_PHONE_NUMBER` DISABLE KEYS */;
INSERT INTO `SCIENTIST_PHONE_NUMBER` VALUES ('laivansam','123456785'),('lehongquang','123456788'),('lehongquang','123456789'),('qttho','123456787'),('vubang','123456783'),('vuhoanglan','123456784'),('vutrongphung','123456786');
/*!40000 ALTER TABLE `SCIENTIST_PHONE_NUMBER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-25  1:29:36
