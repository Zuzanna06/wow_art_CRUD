CREATE TABLE `arts`
(
    `id`    int         NOT NULL UNIQUE AUTO_INCREMENT,
    `title` varchar(45) NOT NULL,
    `desc`  text        NOT NULL,
    `cover` varchar(255) DEFAULT NULL,
    `price` int         NOT NULL
);

INSERT INTO `arts` (`title`, `desc`, `cover`)
VALUES ('test tile', 'test description', 'cover.png');