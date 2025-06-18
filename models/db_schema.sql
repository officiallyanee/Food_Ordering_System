CREATE DATABASE `food_ordering_system`;

USE `food_ordering_system`;

CREATE TABLE `login_details`(
    `user_id` VARCHAR(255) NOT NULL PRIMARY KEY, 
    `name` CHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `pwd_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('customer','chef','admin') NOT NULL,
     UNIQUE (`name`)
);
CREATE TABLE `orders`(
    `order_id` VARCHAR(255) NOT NULL,
    `customer_id` VARCHAR(255) NOT NULL,
    `table_no` BIGINT NOT NULL,
    `specifications` TEXT NULL,
    `ordered_time` DATETIME NOT NULL,
    `received_time` DATETIME NULL,
    `total_fare` FLOAT(53) NOT NULL,
    `payment_status` ENUM('paid','pending') NOT NULL,
    PRIMARY KEY(`order_id`)
);
CREATE TABLE `item_list`(
    `item_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price_per_item` FLOAT(53) NOT NULL,
    `description` TEXT NOT NULL,
    `availablity` BOOLEAN NOT NULL DEFAULT '1',
    `image_url` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`item_id`)
);
CREATE TABLE `sub_orders`(
    `order_id` VARCHAR(255) NOT NULL,
    `item_id` BIGINT UNSIGNED NOT NULL,
    `quantity` INT NOT NULL,
    `chef_id` VARCHAR(255) NULL,
    PRIMARY KEY(`order_id`,`item_id`)
);
CREATE TABLE `categories`(
    `item_id` BIGINT UNSIGNED NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY(`category_id`,`item_id`)
);
CREATE TABLE `category_list`(
    `category_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category` CHAR(255) NOT NULL 
); 

ALTER TABLE
    `orders` ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `login_details`(`user_id`);
ALTER TABLE
    `sub_orders` ADD CONSTRAINT `sub_orders_item_id_foreign` FOREIGN KEY(`item_id`) REFERENCES `item_list`(`item_id`);
ALTER TABLE
    `sub_orders` ADD CONSTRAINT `sub_orders_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`order_id`);
ALTER TABLE
    `sub_orders` ADD CONSTRAINT `sub_orders_chef_id_foreign` FOREIGN KEY(`chef_id`) REFERENCES `login_details`(`user_id`);
ALTER TABLE
    `categories` ADD CONSTRAINT `categories_item_id_foreign` FOREIGN KEY(`item_id`) REFERENCES `item_list`(`item_id`);
ALTER TABLE
    `categories` ADD CONSTRAINT `categories_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category_list`(`category_id`);

-- IN CASE AUTOINCREMENT STARTING VALUE IS OFF:
    -- ALTER TABLE `item_list` AUTO_INCREMENT = 1;
