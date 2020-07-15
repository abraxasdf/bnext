# Bnext Backend Core Test
<p align="center">
  <img src="https://bnext.io/img/logos/logo.svg" width="120" alt="Bnext Logo" /></a>
</p>

## Introducción

Se realiza un backend para recibir y/o actualizar contactos realizado con NestJS en una imagen docker con conexión a una db MYSQL remota. 


## Instalación

## Requisitos

Instalar Docker - https://docs.docker.com/install/<br>
Instalar Postman - https://www.postman.com/

## Correr la imagen

### 1. Ejecutar en terminal:
```
$ docker run --publish 3000:3000 --detach  --name bnext_container abraxasdf/bnext:latest 
```

### 2.- Hacer las lamadas a traves de postman  o  su programa favorito:

## API calls:

**Get All Users**
----
  Regresa todos los usuarios.

* **URL**

  /users/

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    [
    {
        "id": 1,
        "name": "Abraham",
        "lastName": "Alvarez",
        "Phone": "525556431472"
    },
    {
        "id": 2,
        "name": "Teresa",
        "lastName": "lopez",
        "Phone": "525556431480"
    }
]```
 
* **Error Response:**

  * **Code:** 400 BAD_REQUEST <br />
    **Content:** `{ error : "Error al cargar los usuarios. }`
 

**New User**
----
  Crea un nuevo usuario.

* **URL**

  /users/

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**
```
  {
    "name": "test",
    "lastName": "testlastname",
    "Phone": "525554321012"
}
```


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    {
        "id": 1,
        "name": "test",
        "lastName": "testlastname",
        "Phone": "525554321012"
    }```
 
* **Error Response:** 

  * **Code:** 409 CONFLICT <br />
    **Content:** `{ error : "Error el número telefónico no es valido. }`

  O

  * **Code:** 403 FORBIDDEN <br />
  **Content:** `{ error : "Error al crear el usuario. }`
    
  O

  * **Code:** 400 BAD_REQUEST <br />
  **Content:** `{ error : "Error en el nombre/apellido/teléfono del usuario. }`
  
**Get All Contacts**
----
  Regresa todos los contactos de un usuario.

* **URL**

  /contacts/:id

* **Method:**

  `GET`
  
*  **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    [
    {
        "id": 4,
        "idUser": 2,
        "contactName": "Gandalf the White",
        "Phone": "525556431402"
    },
    {
        "id": 5,
        "idUser": 2,
        "contactName": "Frodo Baggins",
        "Phone": "525556431403"
    },...]```
 
* **Error Response:** 

  * **Code:** 403 FORBIDDEN <br />
  **Content:** `{ error : "Error al listar los contactos. }`
    
  O

  * **Code:** 400 BAD_REQUEST <br />
  **Content:** `{ error : "Error en el id del usuario. }`
  
  
**New Contact**
----
  Agrega un nuevo contacto asociado a un usuario.

* **URL**

  /contacts/:id

* **Method:**

  `POST`
  
*  **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**
```
   {
    "idUser": 2,
    "contactName": "testName",
    "Phone": "525556431402"
    }
```

    O


```[
   {
    "idUser": 2,
    "contactName": "testName",
    "Phone": "525556431402"
    },
   {
    "idUser": 2,
    "contactName": "testName2",
    "Phone": "525556431403"
    }
    ]
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    { "message" : 'Contactos agregados corréctamente.'}```
 
* **Error Response:** 

  * **Code:** 403 FORBIDDEN <br />
  **Content:** `{ error : "Error al crear el contacto. }`
    
  O

  * **Code:** 400 BAD_REQUEST <br />
  **Content:** `{ error : "Error en el nombre/id/teléfono del contacto. }`


* **Notes:**
    * La Integracion con neutrinoapi se realiza solamente en el agregado de contactos individuales ya que al aplicarlo en múltiples contactos al mismo tiempo se acaba rápidamente las llamadas disponibles en el tier gratuito.


**Update Contact**
----
  Edita un contacto asociado a un id.

* **URL**

  /contacts/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  **Required:**
 
   `id=[integer]`

* **Data Params**
```
   {
        "idUser": 2,
        "contactName": "Tom Bombadill",
        "Phone": "525556431408"
    }
```

    O


```[{
        "id": 12,
        "contactName": "Tom Bombadill",
        "Phone": "525556431512"
    },{
        "id": 13,
        "contactName": "Tom Bombadill",
        "Phone": "525556431513"
    }]
```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    { "message" : 'Contactos agregados corréctamente.'}```
 
* **Error Response:** 

  * **Code:** 403 FORBIDDEN <br />
  **Content:** `{ error : "Error al editar el contacto. }`
    
  O

  * **Code:** 400 BAD_REQUEST <br />
  **Content:** `{ error : "Error en el nombre/id/teléfono del contacto. }`

* **Notes:**
    * La Integracion con neutrinoapi se realiza solamente en la edición de contactos individuales ya que al aplicarlo en múltiples contactos al mismo tiempo se acaba rápidamente las llamadas disponibles en el tier gratuito.



**Compare Contacts**
----
  Compara dos usuarios y muestra los contacos que tengan en comun. Para esto se muestran los que presenten el mismo número de teléfono aunque tengan diferente nombre.

* **URL**

  /contacts/:id/:id2

* **Method:**

  `GET`
  
*  **URL Params**

  **Required:**
 
   `id=[integer]`
   `id2=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    [
    {
        "id": 3,
        "idUser": 1,
        "contactName": "Gandalf the White",
        "Phone": "525556431402"
    },
    {
        "id": 7,
        "idUser": 1,
        "contactName": "Samwise Gamgee",
        "Phone": "525556431405"
    },
    {
        "id": 11,
        "idUser": 1,
        "contactName": "Gimli of Gloín",
        "Phone": "525556431407"
    }
]```
 
* **Error Response:** 

  * **Code:** 403 FORBIDDEN <br />
  **Content:** `{ error : "Error al listar todos los contactos del Iduser:XX y del IdUser:YY }`
    
  O

  * **Code:** 400 BAD_REQUEST <br />
  **Content:** `{ error : "Error en el id del usuario. }`


## API Arquitectura:


 ```
        $root
        | package.json
        | dockerfile
        | docker-compose.yml
        |_____src
        |       | main.ts
        |       | app.module.ts
        |       | app.service.ts
        |       | app.controller.ts
        |       |_____users
        |       |       | user.controller.ts
        |       |       | user.service.ts
        |       |       |_____dto
        |       |       |_____entities
        |       |_____contacts
        |       |       | contacts.controller.ts
        |       |       | contacts.service.ts
        |       |       |_____dto
        |       |       |_____entities
        |_____node_modules
        |_____test
 ```


## Postman repository:

```
https://documenter.getpostman.com/view/3488208/T17Q54JT?version=latest
```
