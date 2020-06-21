# gocloud-ec2-api


## Pre Requisitos

Para la creación de recursos en AWS se deben seguir los pasos del [repositorio de terraform](https://github.com/stephaniepinero/gocloud-terraform) 

## Instalación en local

- Clonar el repositorio

    ``` $ git clone  https://github.com/stephaniepinero/gocloud-ec2-api.git``` 

- Inicializar dependencias

    ``` $ npm install ```

- Levantar servidor

    ``` $ node index.js ```

- Realizar el llamado al API

    POST localhost:3000/landing/subscriptions

    Parámetros body:
    ```
        {
            "name": "Peter Frost",
            "phone": "987548754",
            "email": "peter@frost.com",
            "rut": "1-9"
        }
    ```
    