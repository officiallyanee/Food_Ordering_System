INSERT INTO `category_list` 
    (`category`) 
VALUES
    ('Starters'),
    ('Main Course'),
    ('Side Dishes'),
    ('Desserts'),
    ('Bevarages'),
    ('Veg'),
    ('Non-Veg'),
    ('Indian'),
    ('Chinese'),
    ('Italian');

INSERT INTO `item_list` 
    (`name`, `price_per_item`, `description`, `availablity`, `image_url`)
VALUES
    ('Paneer Tikka', 180.00, 'Grilled paneer cubes marinated in spices', 1, 'images/paneer_tikka.jpg'),
    ('Chicken Wings', 220.00, 'Spicy grilled chicken wings', 1, 'images/chicken_wings.jpg'),
    ('Veg Biryani', 200.00, 'Aromatic rice with vegetables', 1, 'images/veg_biryani.jpg'),
    ('Butter Chicken', 250.00, 'Creamy tomato chicken curry', 1, 'images/butter_chicken.jpg'),
    ('Spring Rolls', 150.00, 'Crispy rolls with veg filling', 1, 'images/spring_rolls.jpg'),
    ('Tiramisu', 180.00, 'Classic Italian dessert', 1, 'images/tiramisu.jpg'),
    ('Cold Coffee', 90.00, 'Chilled coffee with cream', 1, 'images/cold_coffee.jpg'),
    ('Masala Dosa', 100.00, 'South Indian crepe with potato filling', 1, 'images/masala_dosa.jpg'),
    ('Chow Mein', 130.00, 'Stir-fried noodles with veggies', 1, 'images/chow_mein.jpg'),
    ('Pizza Margherita', 250.00, 'Classic cheese and tomato pizza', 1, 'images/margherita.jpg'),
    ('Gulab Jamun', 80.00, 'Deep fried milk balls in syrup', 1, 'images/gulab_jamun.jpg'),
    ('Chicken Manchurian', 220.00, 'Spicy Indo-Chinese chicken dish', 1, 'images/chicken_manchurian.jpg'),
    ('Garlic Bread', 90.00, 'Toasted bread with garlic and herbs', 1, 'images/garlic_bread.jpg'),
    ('Rasmalai', 100.00, 'Soft cheese balls in sweet milk', 1, 'images/rasmalai.jpg'),
    ('Lassi', 60.00, 'Sweet Punjabi yogurt drink', 1, 'images/lassi.jpg'),
    ('Veg Cutlet', 120.00, 'Crispy veg patties', 1, 'images/veg_cutlet.jpg'),
    ('Fish Curry', 240.00, 'Traditional Indian fish curry', 1, 'images/fish_curry.jpg'),
    ('Hakka Noodles', 140.00, 'Chinese-style fried noodles', 1, 'images/hakka_noodles.jpg'),
    ('Paneer Butter Masala', 210.00, 'Rich paneer curry with butter', 1, 'images/paneer_butter.jpg'),
    ('Mojito', 110.00, 'Minty lime soda drink', 1, 'images/mojito.jpg');

INSERT INTO `categories` 
    (`item_id`, `category_id`) 
VALUES
    (1, 1), (1, 6), (1, 8),
    (2, 1), (2, 7), (2, 8),
    (3, 2), (3, 6), (3, 8),
    (4, 2), (4, 7), (4, 8),
    (5, 1), (5, 6), (5, 9),
    (6, 4), (6, 10),
    (7, 5), (7, 6),
    (8, 2), (8, 6), (8, 8),
    (9, 2), (9, 6), (9, 9),
    (10, 2), (10, 6), (10, 10),
    (11, 4), (11, 8),
    (12, 2), (12, 7), (12, 9),
    (13, 3), (13, 6), (13, 10),
    (14, 4), (14, 8),
    (15, 5), (15, 6), (15, 8),
    (16, 1), (16, 6), (16, 8),
    (17, 2), (17, 7), (17, 8),
    (18, 2), (18, 6), (18, 9),
    (19, 2), (19, 6), (19, 8),
    (20, 5), (20, 6);

INSERT INTO `login_details` 
    (`user_id`,`name`, `email`, `pwd_hash`, `role`) 
VALUES 
    ('3e976206-b72e-48f1-86e0-95283fbb1c39', 'chef', 'c@c', 'nDT2OA2F$2b$10$Z5.U.sRKzJFhGAbjKhOM2..KaWpt0EzE/lN8xPNxD/PzJktlPX4Dm', 'chef') ;

INSERT INTO `login_details`
    (`user_id`,`name`, `email`, `pwd_hash`, `role`) 
VALUES 
    ('e284fcdb-8e4c-43f3-ac54-3d5d8528bb27', 'admin', 'a@a', 'Rc6rZfca$2b$10$V6GfW19bDY56AqUauY3w6.Mer5YTBnJl8cirSwIQx0y.7.XGhAFOG', 'admin') ; 