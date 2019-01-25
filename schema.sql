/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/
DROP DATABASE IF EXISTS store;
CREATE DATABASE store;
USE store; 
        CREATE TABLE merchant3 (
        id INT NOT NULL AUTO_INCREMENT,
        merchant_Id INT NULL,
        product_name VARCHAR(45) NULL,
        department_name VARCHAR(45) NULL,
        price DECIMAL(10, 2) NULL,
        stock_quantity INT NOT NULL,
        PRIMARY KEY (id),
        product_desc VARCHAR(100),
        photolink VARCHAR(200),
        storeid INT NULL
      );


        CREATE TABLE cart (
        id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(45) NULL,
        price DECIMAL(10, 2) NULL,
        stock_quantity INT NULL,
        PRIMARY KEY (id),
        photolink VARCHAR(200)
      );


USE store;
INSERT INTO merchant3 (merchant_Id, product_name, department_name, price, stock_quantity,product_desc,photolink,storeid)
VALUES 
(3,"Tomb Raider", "Video Games", 59.99, 150, "Definitive Edition", "tombraid.jpg",2),
(3, "Monitor", "Electronics", 149.99, 15,"LG Monitor","monitor.jpg",2),
(3, "Shoes","Shoes", 79, 30,"Nike Shoes","shoes.JPG",2),
(3, "Computer Table","Furniture", 300,12,"Ikea Table","table.jpg",2),
(3, "Keyboard", "Electronics",40, 35,"Samsung Keyboard","keyboard.jpg",2),
(3, "Speaker", "Electronics", 100, 25,"Bose Speaker","speaker.jpg",2),
(3, "Titanic DVD", "Movie", 14.99, 11,"Titanic Movie DVD ","titanic.jpg",2),
(3, "What is Node?", "Book", 30.99, 85,"What is Node Book","book.jpg",2),
(3, "Photoshop", "Software", 149.99, 15,"Photoshop","photoshop.jpg",2),
(3, "Guitar", "Musical Instrument", 23.99, 15,"Accostic Guitar","guitar.jpg",2),
  (2,"ring", "security camera", 60.99, 150, "Security Camera", "ringcam.jpg", 2 ),
  (2,"Cards Against Humanity", "Board Games", 19.95, 200, "Adult Card Game","cards.jpg", 2),
  (2,"Red Dead Redemption II", "Video Games", 59.99, 50, "Western Game", "cowboy.jpg", 2),
  (2,"PS4", "Game Console", 299.95, 75, "Entertainment Console", "ps4.jpg", 2),
  (2,"Xbox", "Game Console", 299.99, 35, "Entertainment Console", "xbox.jpg", 2),
  (2,"Nintendo Switch", "Game Console", 299.99, 42, "Entertainment Console", "switch.jpg", 2),
  (2,"Grand Theft Auto", "Video Game", 44.99, 25, "Stealing yo money!", "gtav.jpg", 2),
  (2,"Spyro", "Video Game", 25.50, 100, "Remastered 90s game", "dragon.jpg", 2),
  (2,"Monopoly", "Board Games", 20.00, 35, "The Original Board Game", "boardgame.jpg", 2),
  (2,"PS4 Controller", "Accessories", 59.99, 20, "Controller for your PS4 console", "controller.jpg", 2);


