-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 15 Bulan Mei 2024 pada 09.53
-- Versi server: 10.6.16-MariaDB-0ubuntu0.22.04.1
-- Versi PHP: 8.1.2-1ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(4, 'HeadPhone 1', '789bfe50313a651830c1a07a210cbf1a.jpeg', 'http://localhost:5000/images/789bfe50313a651830c1a07a210cbf1a.jpeg', '2024-04-30 04:37:29', '2024-04-30 07:40:15'),
(5, 'Product 3 New', 'cfe9735404c54909f4983340d0baf310.png', 'http://localhost:5000/images/cfe9735404c54909f4983340d0baf310.png', '2024-04-30 06:35:54', '2024-04-30 07:40:19'),
(6, 'Kadal Terbang Angkasa', '8cff83e9a2f0021b08a24a59f7752d47.jpg', 'http://localhost:5000/images/8cff83e9a2f0021b08a24a59f7752d47.jpg', '2024-04-30 06:50:04', '2024-05-01 01:59:39'),
(8, 'Kurama Mini', '7c0eedb82cdade54a4f5d18ab8bc63c4.jpg', 'http://localhost:5000/images/7c0eedb82cdade54a4f5d18ab8bc63c4.jpg', '2024-04-30 10:08:34', '2024-04-30 10:08:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `judul_tugas` varchar(255) DEFAULT NULL,
  `detail_tugas` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bukti` varchar(255) DEFAULT NULL,
  `status_user` enum('Belum Dikerjakan','Dalam Penugasan','Selesai') DEFAULT 'Belum Dikerjakan',
  `status_admin` enum('Unknown','Belum Disetujui','Selesai') DEFAULT 'Unknown',
  `waktu_awal` datetime DEFAULT NULL,
  `waktu_akhir` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tasks`
--

INSERT INTO `tasks` (`id`, `judul_tugas`, `detail_tugas`, `user_id`, `bukti`, `status_user`, `status_admin`, `waktu_awal`, `waktu_akhir`, `createdAt`, `updatedAt`) VALUES
(1, 'Tugas Integrasi Sistem Updated', 'Melakukan integrasi sistem A dengan sistem B untuk memungkinkan pertukaran data secara otomatis. dan mendokumentasikannya', 2, NULL, 'Belum Dikerjakan', 'Unknown', '2024-05-05 17:00:00', '2024-05-10 00:00:00', '2024-05-03 07:52:25', '2024-05-04 04:24:36'),
(2, 'Tugas Merekap Laporan Rapat', 'Mencamtumkan Poin-Poin pada Rapat, juga Penjelasannya, dan Kesimpulan Rapat.', 4, NULL, 'Belum Dikerjakan', 'Unknown', '2024-05-04 17:00:00', '2024-05-05 17:00:00', '2024-05-03 07:54:47', '2024-05-03 07:54:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Admin','User') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$2S.Okk.V1wz5H/Lt2DiwbuPM6HWyMCe8.LoV7eBDivf1Bt87l3jee', 'Admin', '2024-05-01 02:31:54', '2024-05-01 02:31:54'),
(2, 'Saleh', 'saleh@gmail.com', '$2b$10$6KcIbhqi.mniZFLivdHzY.eP2SHt87gZRSGPFvSNJFC0YVGYLpCUm', 'User', '2024-05-01 02:33:06', '2024-05-01 02:33:06'),
(3, 'Siti', 'siti@gmail.com', '$2b$10$vROnjVL2cGbQy45RE2j3UeHmijYk5FiSoy13NVS1IJrzztd18oQx6', 'User', '2024-05-03 07:31:00', '2024-05-03 07:31:00'),
(4, 'Alex', 'alex@gmail.com', '$2b$10$9PxN/jcm0krRHuVjcP3zKuPH8APTPPTUwFwUXOfT5XS76mK4YEe9i', 'User', '2024-05-03 07:31:15', '2024-05-03 07:31:15'),
(5, 'Aminah', 'minah@gmail.com', '$2b$10$3L4IjWOvBkCT.9zlDixP0uEDoT0O4C4zaUn.xBNO0l6D0mqsUG6T6', 'User', '2024-05-03 14:28:17', '2024-05-03 14:28:17');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
