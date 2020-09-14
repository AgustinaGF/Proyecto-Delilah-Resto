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

-- -- insert order_status
INSERT INTO order_status (status) VALUES
('new'), ('confirmed'), ('preparing'), ('shipping'), ('delivered'), ('canceled')