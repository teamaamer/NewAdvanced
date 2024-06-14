
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- --------------------------------------------------------

-- Table structure for table `services`

CREATE TABLE `services` (
  `ServiceID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ProviderName` varchar(255) NOT NULL,
  `AddedBy`int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Indexes for table `services`


ALTER TABLE `services`
  ADD PRIMARY KEY (`ServiceID`);
  FOREIGN KEY (`AddedBy`) REFERENCES `users`(`UserID`)

-- AUTO_INCREMENT for table `services`

ALTER TABLE `services`
  MODIFY `ServiceID` int(11) NOT NULL AUTO_INCREMENT;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
