const Boom = require('@hapi/boom');
const Entrada = require('../models/entrada');

const getEntradas = async (limit) => {
    try {
        const entradas = await Entrada.find()
            .sort({ createdAt: 'desc' })
            .limit(limit);

        return entradas;
    } catch (error) {
        throw new Boom.Boom(error);
    }
}

const setEntrada = async ({ user, message, avatar }) => {
    try {
        const datos = { user, message, avatar };

        Object.keys(datos).forEach(key => {
            if (!datos[key]) {
                delete datos[key];
            }
        });

        const nuevaEntrada = new Entrada(datos);
        await nuevaEntrada.save();

        return { message: 'Nueva entrada registrada' };
    } catch (error) {
        throw new Boom.Boom(error);
    }
}

module.exports = {
    getEntradas,
    setEntrada,
}
