-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2024 at 09:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenthumb`
--

-- --------------------------------------------------------

--
-- Table structure for table `advice`
--

CREATE TABLE `advice` (
  `AdviceID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Keyword` text NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `AddedBy` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `CropID` int(11) NOT NULL,
  `PlotID` int(11) NOT NULL,
  `PlantingDate` date NOT NULL,
  `HarvestDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventparticipants`
--

CREATE TABLE `eventparticipants` (
  `EventParticipantID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `EventID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `GardenID` int(11) DEFAULT NULL,
  `OrganizerID` int(11) DEFAULT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `MaxMembers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gardenmembers`
--

CREATE TABLE `gardenmembers` (
  `GardenMemberID` int(11) NOT NULL,
  `GardenID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gardens`
--

CREATE TABLE `gardens` (
  `GardenID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ManagerID` int(11) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `MaxMembers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guides`
--

CREATE TABLE `guides` (
  `GuideID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Auther` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Keyword` text NOT NULL,
  `AddedBy` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materialexchange`
--

CREATE TABLE `materialexchange` (
  `ExchangeID` int(11) NOT NULL,
  `Description` text NOT NULL,
  `OfferedBy` int(11) DEFAULT NULL,
  `Location` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Time` text NOT NULL,
  `Status` enum('Open','Closed') NOT NULL,
  `ReceiverID` int(11) DEFAULT NULL,
  `keyword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materialexchange`
--

INSERT INTO `materialexchange` (`ExchangeID`, `Description`, `OfferedBy`, `Location`, `City`, `Time`, `Status`, `ReceiverID`, `keyword`) VALUES
(1, ' cucumber seeds for English cucumber', 1, 'sufian street, Ali store', 'Nablus', 'Monday, 12:30pm', 'Closed', 1, 'seeds');

-- --------------------------------------------------------

--
-- Table structure for table `plots`
--

CREATE TABLE `plots` (
  `PlotID` int(11) NOT NULL,
  `GardenID` int(11) NOT NULL,
  `SoilType` varchar(255) NOT NULL,
  `Sunlight` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `TaskID` int(11) NOT NULL,
  `Description` text NOT NULL,
  `GardenID` int(11) NOT NULL,
  `AssignedTo` int(11) DEFAULT NULL,
  `Status` enum('notAssigned','Assigned','In Progress','Completed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('Manager','Volunteer','Organization','admin') NOT NULL,
  `ProfileInfo` text DEFAULT NULL,
  `ProfilePic` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `Role`, `ProfileInfo`, `ProfilePic`) VALUES
(1, 'Doaa', 'doaa.abd.119@gmail.com', '$2b$10$GMdMO198DBefDZhR7EgKHO2NS/9EWhz7qsn/yy4eM1Npiy/ERGtfC', 'Volunteer', 'info', 'url');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advice`
--
ALTER TABLE `advice`
  ADD PRIMARY KEY (`AdviceID`),
  ADD KEY `AddedBy` (`AddedBy`);

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`CropID`),
  ADD KEY `PlotID` (`PlotID`);

--
-- Indexes for table `eventparticipants`
--
ALTER TABLE `eventparticipants`
  ADD PRIMARY KEY (`EventParticipantID`),
  ADD KEY `EventID` (`EventID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`EventID`),
  ADD KEY `GardenID` (`GardenID`),
  ADD KEY `OrganizerID` (`OrganizerID`);

--
-- Indexes for table `gardenmembers`
--
ALTER TABLE `gardenmembers`
  ADD PRIMARY KEY (`GardenMemberID`),
  ADD KEY `GardenID` (`GardenID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`GardenID`),
  ADD KEY `ManagerID` (`ManagerID`);

--
-- Indexes for table `guides`
--
ALTER TABLE `guides`
  ADD PRIMARY KEY (`GuideID`),
  ADD KEY `AddedBy` (`AddedBy`);

--
-- Indexes for table `materialexchange`
--
ALTER TABLE `materialexchange`
  ADD PRIMARY KEY (`ExchangeID`),
  ADD KEY `OfferedBy` (`OfferedBy`),
  ADD KEY `ReceiverID` (`ReceiverID`);

--
-- Indexes for table `plots`
--
ALTER TABLE `plots`
  ADD PRIMARY KEY (`PlotID`),
  ADD KEY `GardenID` (`GardenID`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskID`),
  ADD KEY `GardenID` (`GardenID`),
  ADD KEY `AssignedTo` (`AssignedTo`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advice`
--
ALTER TABLE `advice`
  MODIFY `AdviceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `CropID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eventparticipants`
--
ALTER TABLE `eventparticipants`
  MODIFY `EventParticipantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gardenmembers`
--
ALTER TABLE `gardenmembers`
  MODIFY `GardenMemberID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `GardenID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guides`
--
ALTER TABLE `guides`
  MODIFY `GuideID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materialexchange`
--
ALTER TABLE `materialexchange`
  MODIFY `ExchangeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `plots`
--
ALTER TABLE `plots`
  MODIFY `PlotID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advice`
--
ALTER TABLE `advice`
  ADD CONSTRAINT `advice_ibfk_1` FOREIGN KEY (`AddedBy`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `crops`
--
ALTER TABLE `crops`
  ADD CONSTRAINT `crops_ibfk_1` FOREIGN KEY (`PlotID`) REFERENCES `plots` (`PlotID`);

--
-- Constraints for table `eventparticipants`
--
ALTER TABLE `eventparticipants`
  ADD CONSTRAINT `eventparticipants_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`EventID`),
  ADD CONSTRAINT `eventparticipants_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `gardens` (`GardenID`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`OrganizerID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `gardenmembers`
--
ALTER TABLE `gardenmembers`
  ADD CONSTRAINT `gardenmembers_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `gardens` (`GardenID`),
  ADD CONSTRAINT `gardenmembers_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `gardens`
--
ALTER TABLE `gardens`
  ADD CONSTRAINT `gardens_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `guides`
--
ALTER TABLE `guides`
  ADD CONSTRAINT `guides_ibfk_1` FOREIGN KEY (`AddedBy`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `materialexchange`
--
ALTER TABLE `materialexchange`
  ADD CONSTRAINT `materialexchange_ibfk_1` FOREIGN KEY (`OfferedBy`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `materialexchange_ibfk_2` FOREIGN KEY (`ReceiverID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `plots`
--
ALTER TABLE `plots`
  ADD CONSTRAINT `plots_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `gardens` (`GardenID`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`GardenID`) REFERENCES `gardens` (`GardenID`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`AssignedTo`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
