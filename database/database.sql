-- create table users
CREATE TABLE users (
  user_id      INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username     VARCHAR (60) NOT NULL,
  password     VARCHAR (150) NOT NULL,
  full_name    VARCHAR (60) NOT NULl,
  email        VARCHAR (60) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  address      VARCHAR (60) NOT NULL,
  user_admin   VARCHAR (10) NOT NULL DEFAULT 'user',
  createdDate  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);
--  create table products
CREATE TABLE products (
  product_id       INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_title    VARCHAR (60) NOT NULL,
  product_price    INT UNSIGNED NOT NULL,
  product_image    VARCHAR(100) NOT NULL,
  description      VARCHAR(100) NOT NULL,
  createdDate      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
);


--  create table order_status
 CREATE TABLE order_status (
    status_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    status    VARCHAR(30) NOT NULL DEFAULT 'new'
);
-- create table orders
CREATE TABLE orders (
  order_id            INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  status              INT NOT NULL DEFAULT 1,
  method_of_payment   VARCHAR (60) NOT NULL,
  user_id             INT NOT NULL,
  createdDate         DATETIME NOT NULL DEFAULT current_timestamp(),
  updateDate          DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  CONSTRAINT FK_userOrders FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_orderStatus FOREIGN KEY (status) REFERENCES order_status (status_id) ON DELETE CASCADE ON UPDATE CASCADE
); 
-- create table orders_detail
CREATE TABLE orders_detail (
  order_detail_id    INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  order_id           INT NOT NULL,
  product_id         INT NOT NULL,
  order_description  VARCHAR (200) NOT NULL,
  product_price      INT NOT NULL,
  product_amount     INT NOT NULL,
  createdDate      DATETIME NOT NULL DEFAULT current_timestamp(),
  updateDate       DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  CONSTRAINT FK_ordersId FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_productsId FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);
--  insert order_status
INSERT INTO order_status (status) VALUES
('new'), ('confirmed'), ('preparing'), ('shipping'), ('delivered'), ('canceled');

-- insert users
INSERT INTO users (username, password,full_name, email,phone_number, address) VALUES
('LuisMiguel',"auto_verde", 'Juan Luis', 'luismi@gmail.com', '1199998888', 'gascon 300 dto c'),
('Grace', 'auto_rojo', 'Graciana Perez', 'grace@gmail.com', '1165954390', 'Rivadavia 1300 dtoA'),
('JoeyRamone', 'auto_azul', 'Ramon Valdez', 'joey@gmail.com', '1165946595', 'calle falsa 123');

--  insert products
INSERT INTO products (product_title,product_price,product_image, description) VALUES
('Veggie Burguer', 400, 'https://via.placeholder.com/150', 'Lentil burger with lettuce and tomato'),
('Tuna and Prawns Salad', 500, 'https://via.placeholder.com/150', 'Rice with Tuna and Prawns'),
('Pepperoni pizza', 250, 'https://via.placeholder.com/150', 'Pepperoni classic extra large pizza');


-- insert orders
INSERT INTO orders ( method_of_payment, user_id) VALUES
('cash', 3),
('credit card', 1);


-- insert orders_detail
INSERT INTO orders_detail (order_id, product_id, order_description, product_price, product_amount) VALUES
( 1, 1, 'Lentil burger with lettuce and tomato', 400, 3),
( 1, 2, 'Rice with Tuna and Prawns', 500, 1),
( 2, 3, 'Pepperoni classic extra large pizza', 250, 2),
( 2, 2, 'Rice with Tuna and Prawns', 500, 1),
( 2, 1, 'Lentil burger with lettuce and tomato', 400, 5);
