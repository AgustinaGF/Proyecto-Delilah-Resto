DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS orders_details;

-- create table users
CREATE TABLE IF NOT EXISTS users (
    user_id       INT PRIMARY KEY AUTO_INCREMENT,
    username      VARCHAR (60) NOT NULL,
    password      VARCHAR (150) NOT NULL,
    full_name     VARCHAR (60) NOT NULL,
    email         VARCHAR (60) NOT NULL,
    phone_number  VARCHAR(15) NOT NULL,
    address       VARCHAR (60) NOT NULL,
    user_admin    VARCHAR (10) NOT NULL DEFAULT 'user',
    is_disabled   BOOLEAN DEFAULT FALSE,
    createdDate   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updateDate    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
--  create table products, fijarme si quiero agregarle una descripcion

CREATE TABLE IF NOT EXISTS products (
    product_id          INT PRIMARY KEY AUTO_INCREMENT,
    product_title       VARCHAR (60) NOT NULL,
    product_price       INT UNSIGNED NOT NULL,
    product_image       VARCHAR (100) NOT NULL,
    description         VARCHAR(100) NOT NULL,
    is_disabled         BOOLEAN DEFAULT FALSE,
    createdDate         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updateDate          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
 {  "product_title": "Burguer Veggie",
     "product_price":"400", 
     "product_image": "https://via.placeholder.com/150",
     "description": "lentil burger with lettuce and tomato"
 }
-- create table orders

CREATE TABLE IF NOT EXISTS orders (
    order_id         INT PRIMARY KEY AUTO_INCREMENT,
    id_status        VARCHAR(60) NOT NULL,     
    date              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    order_description VARCHAR(200) NOT NULL,
    method_of_payment VARCHAR (60) NOT NULL,
    user_id           INT NOT NULL 
    createdDate       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    updateDate        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   CONSTRAINT FK_userOrders FOREIGN KEY(user_id) REFERENCES users(user_id)
)

CREATE TABLE status (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    status VARCHAR (255) NOT NULL
)
INSERT INTO status ("status") VALUES ('New'), ('Confirmed'), ('Preparing'), ('Shipping'), ('Canceled'), ('Delivered')
-- create table order detail
-- (aca con producto_id me vendria el precio del producto por eso no seria necesario ponerlo en ootro lado con precio y cantidad tendria que devolver el total)
CREATE TABLE IF NOT EXISTS orders_detail (
  id_order_detail   INT PRIMARY KEY AUTO_INCREMENT,
  order_id          INT NOT NULL
  product_id        INT NOT NULL  
  product_amount    INT NOT NULL
  createdDate       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  updateDate        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  CONSTRAINT FK_ordersId FOREIGN KEY(order_id) REFERENCES orders(order_id),
  CONSTRAINT FK_productsId FOREIGN KEY(product_id) REFERENCES products(product_id)
)

    