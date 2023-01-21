# API

## _Serviços Distribuídos_

Api REST escrita em Node.js com todos os endpoints da API com validações.
Uma base de dados em PostgreSQL.
Testes da API atraves da tecnologia Swagger.

## Installation

Api REST requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
npm i
npm i express
npm i cors
npm i dotenv
npm i swagger-ui-express
npm i pg-pool
npm i knex
```

Create a file with name "docker-compose.yml". NOTE: Change both volumes for your correct directory

```sh
version: "3.8"
services:
  db:
    image: postgres
    container_name: local_pgdb
    restart: always
    ports:
      - "54320:5432"
    environment:
      POSTGRES_USER: ipvc
      POSTGRES_PASSWORD: admin
    volumes:
      - local_pgdata:/c/Users/Nelson Freitas/Desktop/Project_SD-main/docker/volumes/postgres

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: ipvc@ipvc.pt
      PGADMIN_DEFAULT_PASSWORD: admin
    volumes:
      - pgadmin-data:/c/Users/Nelson Freitas/Desktop/Project_SD-main/docker/volumes/postgres

volumes:
  local_pgdata:
  pgadmin-data:

```

After creating the file run the follow command to start the container:

```sh
docker-compose up --build -d
```

If you want to shut down the container run the follow command:

```sh
docker-compose down
```

## Pg-admin

To enter in pg-admin the correct user and passwords are:

```sh
username: ipvc@ipvc.pt
password: ipvc
```

## Migrate table server

```sh
cd sd
cd dev
npx knex migrate:latest
```

If you want to destroy the tables with knex, run the follow command

```sh
npx knex migrate:rollback
```

## Start Server

You need to to start the server if you want to test de API in Swagger
To start i will show you the commands you have to run in the terminal.

```sh
cd sd
cd dev
nodemon index.js
```

To see if the API is running correctly it should appear in the terminal "api is listening on port 3001!"

## Insert data into database

You need to insert the csv data into database to test it in Swagger and below will have the commands to do it in the terminal

```sh
cd sd
cd dev
cd data-csv
nodemon app.js
```

## Enter in Swagger

To test the API with Swagger you need to put in the search bar of your browser the link below

```sh
http://localhost:3001/doc/
```

After that you need to create an Admin, Viewer and Editor for diferents creates. After that copy the token and use it on top like this:

```sh
Bearer + token
```

## Trabalho realizado por: Rui Carvalho e Nelson Freitas
