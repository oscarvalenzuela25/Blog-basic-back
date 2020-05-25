# Proyecto de blog personal

### Back-end

El back-end fue creado con **Node**

##### Cosas importantes a destacar del proyecto

* Utilizacion de nodemon dentro del back para tener un servidor que se actualize cuando se guarde
* Creacion de middleware para poder verificar si el usuario esta autentificado con JWT.
* Subir imagenes desde una peticion HTTP y verificarlo con File System.
* Ocupar el paquete de mongoose-paginate y ocuparlo en el modelo de post como plugin y despues usarlo en el controlador para traer los posts.
* Usar el paquete de connect-multiparty para poder subir un archivo en cierta localizacion del backend.
* Aprender a utilizar JWT en el back-end con la intencion de mandar el token de autentificacion con un refresh token para poder actualziar el token si esta en el horario extra de sesion.
