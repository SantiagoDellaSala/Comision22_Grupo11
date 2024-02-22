-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema suyds2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema suyds2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `suyds2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `suyds2` ;

-- -----------------------------------------------------
-- Table `suyds2`.`quality`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`quality` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`state` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`troley`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`troley` (
  `id` INT NOT NULL,
  `userId` INT NOT NULL,
  `total` INT NOT NULL,
  `stateId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_troley_state1_idx` (`stateId` ASC) VISIBLE,
  CONSTRAINT `fk_troley_state1`
    FOREIGN KEY (`stateId`)
    REFERENCES `suyds2`.`state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`categories` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`origins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`origins` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`materials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`materials` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`products` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `materialId` INT NOT NULL,
  `originId` INT NOT NULL,
  `description` TEXT NOT NULL,
  `discount` INT NULL DEFAULT '0',
  `mainImage` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `itemsId` INT NOT NULL,
  `qualityId` INT NOT NULL,
  `categoryId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ik_produc_orign_idx` (`originId` ASC) VISIBLE,
  INDEX `fk_prod_mat_idx` (`materialId` ASC) VISIBLE,
  INDEX `fk_products_quality1_idx` (`qualityId` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `ik_produc_orign`
    FOREIGN KEY (`originId`)
    REFERENCES `suyds2`.`origins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prod_mat`
    FOREIGN KEY (`materialId`)
    REFERENCES `suyds2`.`materials` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_quality1`
    FOREIGN KEY (`qualityId`)
    REFERENCES `suyds2`.`quality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categoryId`)
    REFERENCES `suyds2`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`items` (
  `id` INT NOT NULL,
  `productId` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `carrito_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_carrito1_idx` (`carrito_id` ASC) VISIBLE,
  INDEX `fk_items_prod_idx` (`productId` ASC) VISIBLE,
  CONSTRAINT `fk_items_carrito1`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `suyds2`.`troley` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_prod`
    FOREIGN KEY (`productId`)
    REFERENCES `suyds2`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`roles` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`users` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT 'default.png',
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `roleId` INT NOT NULL,
  `troleyId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_roles1_idx` (`roleId` ASC) VISIBLE,
  INDEX `fk_users_troley1_idx` (`troleyId` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roleId`)
    REFERENCES `suyds2`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_troley1`
    FOREIGN KEY (`troleyId`)
    REFERENCES `suyds2`.`troley` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `suyds2`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `suyds2`.`images` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `productsId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_images_products1_idx` (`productsId` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`productsId`)
    REFERENCES `suyds2`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
