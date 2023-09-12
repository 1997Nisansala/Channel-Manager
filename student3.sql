-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 06:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student3`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course_id` varchar(30) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `course_id`, `course_name`, `course_description`) VALUES
(9, 'CO221', 'Digital Design', 'Core course'),
(4, 'CO222', 'Programming Fundamentals', NULL),
(3, 'CO328', 'Software Architecture', NULL),
(1, 'CO502', 'Computer Architecture', NULL),
(2, 'CO528', 'Neural Networks', NULL),
(10, 'CO541', 'Artificial Intelligence', 'Technical course'),
(6, 'CO544', 'Machine Learning', 'Technical course');

-- --------------------------------------------------------

--
-- Table structure for table `students_details`
--

CREATE TABLE `students_details` (
  `id` int(11) NOT NULL,
  `studentid` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `course_id1` varchar(30) DEFAULT NULL,
  `course_id2` varchar(30) DEFAULT NULL,
  `course_id3` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students_details`
--

INSERT INTO `students_details` (`id`, `studentid`, `firstName`, `lastName`, `email`, `address`, `course_id1`, `course_id2`, `course_id3`) VALUES
(1, 'E/17/212', 'Dananjaya', 'Morais', 'dana@gmail.com', 'No 41, Dombawala, Udugampola', 'CO221', 'CO328', 'CO502'),
(18, 'E/17/001', 'Nihal', 'Basnayaka', 'nihal@gmail.com', 'Gampaha', 'CO222', 'CO502', 'CO328'),
(21, 'E/17/223', 'Dananjaya', 'Morais', 'dana@gmail.com', 'No 41, Dombawala, Udugampola', 'CO502', 'CO222', 'CO528'),
(23, 'E/17/325', 'Ravindu', 'Silva', 'silva@gmail.com', '23,Gampaha', 'CO222', 'CO502', 'CO528'),
(27, 'E/17/251', 'Dananjaya', 'Morais', 'dana@gmail.com', 'No 41, Dombawala, Udugampola', 'CO328', 'CO222', 'CO528'),
(31, 'E/17/420', 'Dananjaya', 'Morais', 'dana@gmail.com', 'No 41, Dombawala, Udugampola', 'CO221', 'CO502', 'CO528'),
(32, 'E/17/413', 'Nisansala2', 'Dananjaya', 'dananjaya.nisansale@gmail.com', 'No 38', 'CO221', 'CO328', 'CO502');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `students_details`
--
ALTER TABLE `students_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studentid` (`studentid`),
  ADD KEY `course_id1` (`course_id1`),
  ADD KEY `course_id2` (`course_id2`),
  ADD KEY `course_id3` (`course_id3`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `students_details`
--
ALTER TABLE `students_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students_details`
--
ALTER TABLE `students_details`
  ADD CONSTRAINT `students_details_ibfk_1` FOREIGN KEY (`course_id1`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `students_details_ibfk_2` FOREIGN KEY (`course_id2`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `students_details_ibfk_3` FOREIGN KEY (`course_id3`) REFERENCES `course` (`course_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
