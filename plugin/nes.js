const Nes = require('@hapi/nes');

exports.wsPlugin = {
    plugin: Nes,
    name: 'ws-plugin',
    version: '1.0.0',
    options: {
        auth: {
            timeout: 20000,
            index: true,
        },
        async onConnection(socket) {
            console.log('There\'s a user connected');
            await socket.send(`ID: ${socket.id}`);
        },
        async onDisconnection(socket) {
            console.log('Closed connection of', socket.id);
        },
    },
    async register(server, options) {
        console.log('Register');
    }
};
