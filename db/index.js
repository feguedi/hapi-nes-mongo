const fs = require('fs');
const path = require('path');
const Boom = require('@hapi/boom');
const { connect, connection } = require('mongoose');

const Entrada = require('../models/entrada');

exports.getDB = () => {
    const db = fs.readFileSync(path.join(__dirname, 'data.json'));

    return JSON.parse(db.toString());
}

exports.addToDB = async (data) => {
    try {
        const db = this.getDB();
        db.push(data);

        await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(db, null, 2));

        return true;
    } catch (error) {
        return false;
    }
}

exports.connect = async () => {
    try {
        await connect(process.env.MONGODB_CNN, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Boom.Boom(error);
    }
}

exports.populate = async () => {
    try {
        const entradas = await Entrada.find();
        const jsonDB = this.getDB();

        if (!entradas || entradas.length < jsonDB.length) {
            const errores = [];

            jsonDB.forEach(async item => {
                try {
                    const nuevaEntrada = new Entrada(item);
                    await nuevaEntrada.save();
                } catch (error) {
                    console.error(error);
                    errores.push(item.user);
                }
            });

            const message = errores.length > 0 ? `No se pudo agregar la entrada de: ${errores.join(', ')}` : 'Se pobló la base de datos'
            return { message };
        } 

        return { message: 'Ya existe la base de datos' };
    } catch (error) {
        throw new Boom.Boom(error);
    }
}

exports.connection = connection;
