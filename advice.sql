
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `advice`
--

CREATE TABLE `advises` (
  `AdviceID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Keyword` text NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `AddedBy` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Type` enum('Advice','Tutorial') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for table `advice`
--
ALTER TABLE `advises`
  ADD PRIMARY KEY (`AdviceID`),
  ADD KEY `AddedBy` (`AddedBy`);

-- AUTO_INCREMENT for table `advice`
--
ALTER TABLE `advises`
  MODIFY `AdviceID` int(11) NOT NULL AUTO_INCREMENT;


-- Constraints for table `advice`
--

ALTER TABLE `advice`
  ADD CONSTRAINT `advice_ibfk_1` FOREIGN KEY (`AddedBy`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
