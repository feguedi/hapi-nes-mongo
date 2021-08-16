require('dotenv').config();
const path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Nes = require('@hapi/nes');
const Boom = require('@hapi/boom');
const faker = require('faker');

const db = require('../db/plugin');

const Server = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        routes: {
            files: {
                relativeTo: path.join(__dirname)
            }
        }
    });

    await server.register([Nes, Inert, db], { once: true });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                index: 'index.html',
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/timeline',
        async handler (request, h) {
            try {
                const entradas = await server.methods.db.findEntradas(5);
                return entradas;
            } catch (error) {
                throw new Boom.Boom(error);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/timeline/createEntry',
        async handler (request, h) {
            try {
                const entrada = {
                    user: faker.name.findName(),
                    message: faker.lorem.paragraph(),
                    avatar: faker.image.avatar()
                };

                await server.methods.db.saveEntrada(entrada);
                return h.response().code(204);
            } catch (error) {
                throw new Boom.Boom(error);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/h',
        config: {
            id: 'hello',
        },
        handler (request, h) {
            return 'world!';
        }
    })

    server.subscription('/timeline/updates');

    // Setup the RethinkDB change-feed and push it to the websocket connection.
    server.methods.db.setupChangefeedPush();

    return server;
}

exports.start = async () => {
    try {
        const server = await Server();

        await server.start();

        console.log(`Servidor corriendo en ${server.info.uri}`);

        return server;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

exports.init = async () => {
    try {
        const server = await Server();

        await server.initialize();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
