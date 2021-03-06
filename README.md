# Delilah Resto🍕 🍔 🥗
## Descripción del Proyecto

El proyecto consistió en crear una API que permita realizar una serie de operaciones online para un restaurante. Para esto fue necesario crear una estructura REST API dentro de la cual se hizo la correspondiente modularización dividiendo las responsabilidades entre rutas, servicios y repositorio.
El esquema del proyecto está compuesto por un sistema de operaciones CRUD para usuarios, productos y pedidos, dentro de este sistema existe una metodología de permisos que diferencia entre administradores y usuarios, lo cual permite restringir algunas operaciones a los usuarios que no sean administradores.
Esta API genera y utiliza información almacenada en una base de datos relacional MySQL, esto lo hace mediante los diversos endpoint que posee para las diferentes operaciones CRUD.

## Operaciones del Proyecto
- Registrar Usuario
- Autenticación de un usuario registrado (login).
- Búsqueda de información de los usuarios registrados.
- Modificación de datos de los usuarios registrados.
- Eliminación de usuarios.
- Crear un producto.
- Búsqueda de productos.
- Modificación de un producto.
- Eliminación de un producto.
- Crear pedido.
- Búsqueda de información de pedidos.
- Modificación del estado de un pedido.
- Cancelación de un pedido.

## Instrucciones de Instalación ⚙️

### 1 -Descargar o clonar el repositorio desde [el siguiente link](https://github.com/AgustinaGF/Proyecto-Delilah-Resto.git).

### 2 - Instalar Node.js

### 3 - Instalar las dependencias
```
npm install
```
### 4 - Crear Base de Datos 

Con XAMPP u otro programa que soporte MySQL abrir un servidor local y  configurarlo para que se ejecute en el puerto `3306`.
- Inicializar los servicios de Apache y MySQL
- Crear la base de datos en phpMyAdmin con:
 ``` 
 CREATE DATABASE delilah
```
- Desde el **panel de control** de la base de datos `delilah` importar el archivo `database/database.sql`.
De esta manera se crearan las tablas necesarias, los productos y el estado de los pedidos.

⚠️ ES MUY IMPORTANTE QUE SE RESPETEN EL ORDEN DE LOS SCRIPTS⚠️

### 5- Inicializar el servidor 🚀
Para esto es necesario crer un archivo `.env` dentro de tu repositorio local en el directorio principal e ingresar las siguientes variables.
```
CONNECTION_DB = "mysql://root@localhost:3306/delilah"
SECRET_JWT= "superSecreta"
```
- Por ultimo dentro de la consola de Visual Estudio Code deberas correr el siguiente comando
```
npm run dev
```
 🎉 Listo tu Servidor esta inicializado y listo para usar🎉
 
### 6- Registrar Usuario

Una vez inicializado el servidor tenes que registrar un usuario en el siguiente endpoint `localhost:3000/api/auth/register`
**El modelo de payload  para registrar usuario es el siguiente**
```
{
    "username": "LuisMiguel",
    "password": "auto_verde",
    "full_name": "Juan Luis",
    "email": "luismi@gmail.com",
    "phone_number": "1199998888",
    "address": "gascon 300 dto c"
}
```


### 7- Designar como administrador a un usuario
Al crear eun usuario automaticamente por  default su rol va a ser `user` y no administrador, como esta Api cuenta con una metodologia de permisos para que sean los administradores los unicos con autorización para realizar todas las operaciones CRUD, va a ser necesario que desde phpMyAdmin le asignes rol de "admin" a un usuario de la suiguiente manera :

````
UPDATE users SET user_admin =  "admin"  WHERE  user_id  = 1
````
`el valor de user_id va a cambiar segun cual sea el usuario que queres que tenga rol de admin`

### 8- Autenticar usuario para realizar operaciones
Para realizar operaciones es necesario que primero el usuario inicie sesión en el sistema, esto lo podras hacer con el siguiente endpoint `localhost:3000/api/auth/login`

**Ejemplo de Payload para iniciar sesión**
```
{"email":"luismi@gmail.com",
 "password": "auto_verde"
 }
```
Con el token obtenido como respuesta ya vas a poder realizar operaciones, algunas van a estar restringuidas para los usuarios que no tengan rol de administrador.

⚠️Es importante que al momento de realizar alguna operacion envies el token en headers "Authorization" = "Bearer(Token)"⚠️

### 9 - Realizar pedidos
El usuario que ya este logueado puede ver todos los productos disponibles utilizando el siguiente endpoint `localhost:3000/api/products`

Por ultimo el usuario logueado podra realizar pedidos de productos utilizando este endpoint `localhost:3000/api/orders`

**Ejemplo de Payload**

```
{
"method_of_payment" : "cash",
"detail" :[{
"productId":1,
"product_amount":3
},
{ "productId":2,
 "product_amount":1
}]
}  
```

### 10- En la documentación de Postman podras ver ejemplos de los payload y el funcionamiento de los diferentes endpoints de esta API.

## Documentacion de la API
## [Postman - Delilah Resto](https://documenter.getpostman.com/view/11971565/TVK8ZzGU#d5f23e71-fcde-4daf-8250-4936b8ad7a9d)

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- JWT
- Dotenv
- bcrypt
- MySQL
- Postman








