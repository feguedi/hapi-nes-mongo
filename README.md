# Hapi Nes Mongo

This is just an example of how to make a Hapi Webservice with its websockets module –Nes– and MongoDB.

## Aim

This project it's inspired on [the realtime timeline](https://github.com/p-meier/hapi-realtime-timeline) of [Patrick Meier](https://patrick-meier.io). It's an update to his tutorial to demonstrate how to utilize the [Nes](https://hapi.dev/module/nes) plugin to build a realtime project using websockets with [Hapi](https://hapi.dev), with the big difference that I decided to use MongoDB instead RethinkDB.

This is a short explanation on how to use websockets with Hapi, so that's why there's no use of a client-side framework (Angular, React, Vue, etc.).

There's a little bit of spanglish, specifically with the translation of __"entry"__ as __"entrada"__, just as a preview disclaimer.

## Requirements

* [NodeJS](https://www.nodejs.org)
* [MongoDB](https://www.mongodb.com)

We can use an environment with Vagrant or a containter with Docker to host the database or use a database in the cloud (MongoDB Atlas).

### Notes

> The database only works with a replica set or a sharded cluster. MongoDB doesn't listen changes with a standalone instance.

Here is some information and tutorials that can be useful:

* [Deploy a Replica Set – MongoDB Manual](https://docs.mongodb.com/manual/tutorial/deploy-replica-set)
* [Converting MongoDB instance from Standalone to Replica Set and Backing Up](https://dba.stackexchange.com/questions/243780/converting-mongodb-instance-from-standalone-to-replica-set-and-backing-up)
* [Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures)
* [Deploy Replica Set With Keyfile Authentication – MongoDB Manual](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-accesscontrol/#std-label-deploy-repl-set-with-auth)
* [Replication – MongoDB Manual](https://docs.mongodb.com/manual/replication)
* [How to deploy a MongoDB Replica Set using Docker](https://towardsdatascience.com/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49)
* [Set up a Mongo Replica Set with Docker](https://autoize.com/set-up-minimal-mongodb-three-3-replica-set-with-docker)

## Scripts

### Setting the environment variables

We need to copy the __*.env.example*__ file, rename it as __.env__ and put our own variables.

```sh
cp .env.example .env
```

### Installing dependencies

```sh
npm install
```

### Building the web bundle

```sh
npm run build
```

### Start the service

```sh
npm start
```

### Start the service as a developer

```sh
npm run dev
```
