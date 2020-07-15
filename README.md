# Bnext Backend Core Test

## Introduccióm

Se realiza un backend para recibir y/o actualizar contactos realizado con NestJS en una imagen docker con conexión a una db MYSQL remota. 

## Llamadas Api:


#Trae a todos los usuarios#

http://localhost:3000/users/ // GET <br>
Respuesta:<br>
[ {<br>
        "id": 1,<br>
        "name": "Nombre",<br>
        "lastName": "Apellido",<br>
        "Phone": "525501234567"<br>
    }, { ... },...<br>
]<br>


#Guarda un usuario nuevo#

http://localhost:3000/users/ // POST <br>
Respuesta:<br>
 {<br> 
        "name": "Nombre",<br>
        "lastName": "Apellido",<br>
        "Phone": "525501234567"<br>
    }<br>

#Trae a todos los contactos de un usuario identificados por su IDUser#

http://localhost:3000/contacts/IDUser // GET <br>
Respuesta:<br>
[ {<br>
        "id": 1,<br>
        "idUser": 1,<br>
        "name": "Nombre",<br>
        "lastName": "Apellido",<br>
        "Phone": "525501234567"<br>
    }, { ... },...<br>
]<br>

#Guarda un contacto nuevo#

http://localhost:3000/contacts/ // POST <br>
Body:<br>
{<br>
    "idUser": 2,<br>
    "contactName" : "Nombre",<br>
    "Phone" : "525501234567"<br>
}<br>

#Actualiza uno o varios contactos por su id#

http://localhost:3000/contacts/IDUser // PUT <br>
Body:<br>
[ {<br>
    "id": 11,<br>
    "contactName" : "Nombre",<br>
    "Phone" : "525501234567"<br>
}, { ... },...<br>
]<br>


#Compara los contactos de dos usuarios diferentes#

http://localhost:3000/contacts/IDUser1/IDUser2 // GET <br>
Respuesta:<br>
[ {<br>
    "id": 11,<br>
    "idUser": IDUser1,<br>
    "contactName" : "Nombre",<br>
    "Phone" : "525501234567"<br>
}, { ... },...<br>
]<br>

Note: La comparación es en el numero de teléfono del primer contacto

 




## Instalación

Para instalar siga estas instrucciones:<br>
+ Descargar la app Docker desktop de https://www.docker.com/products/docker-desktop
+ Instalar la app.
+ En la terminal ingresar: docker pull abraxasdf/bnext:latest  
+ En la terminal ingresar: Docker images  //Anotar el  id de la imagen
+ En la terminal ingresar: docker run --publish 3000:3000 --detach  --name bn XXXX //remplazar XXXX con  el  id de la imagen
+ En la consola de Docker podemos ver su arraque: [NestApplication] Nest application successfully started  
+ Cargar la pagina: http://www.troop.com.mx/bnext_front/ Y usar las funciones que se encuentran alli.




