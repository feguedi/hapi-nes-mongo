const Boom = require('@hapi/boom');
const Entrada = require('../models/entrada');

const { getEntradas, setEntrada } = require('../controllers');
const { connect, populate, connection } = require('./index');

exports.plugin = {
    name: 'realtime-db',
    version: '1.1.0',
    async register (server, options) {
        try {
            await connect();
            await populate();

            server.method('db.saveEntrada', async (entrada) => {
                return await setEntrada(entrada);
            });

            server.method('db.findEntradas', async (limit) => {
                return await getEntradas(limit);
            });

            server.method('db.setupChangefeedPush', async () => {
                // INFO: to listen the database changes it has to be a replica set
                // instead a standalone

                // Requires a replica set running MongoDB >= 3.6.0

                // https://mongoosejs.com/docs/api.html#model_Model.watch
                const changeStream = Entrada.watch();

                changeStream.on('change', change => {
                    console.log(change);
                    const { _id, createdAt, user, message, avatar } = change.fullDocument;

                    const nuevaEntrada = {
                        id: _id,
                        createdAt,
                        user,
                        message,
                        avatar,
                    };

                    server.publish('/timeline/updates', nuevaEntrada);
                });

                // https://www.youtube.com/watch?v=n9Du-oESxCg
                // const entradasChangeStream = connection.collection('entradas').watch();

                // entradasChangeStream.on('change', change => {
                //     const { _id, createdAt, user, message, avatar } = change.fullDocument;

                //     switch (change.operationType) {
                //         case 'insert':
                //             const entrada = {
                //                 id: _id,
                //                 createdAt,
                //                 user,
                //                 message,
                //                 avatar,
                //             }
                //             server.publish('/timeline/updates', entrada);
                //             break;

                //         default:
                //             break;
                //     }
                // });
            });
        } catch (error) {
            throw new Boom.Boom(error);
        }
    }
};
