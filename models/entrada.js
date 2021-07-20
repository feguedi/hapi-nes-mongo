const { Schema, model } = require('mongoose');
const faker = require('faker');

const EntradaSchema = new Schema({
    user: {
        type: String,
        required: [true, 'Se requiere el nombre de usuario'],
        default: faker.name.findName(),
    },
    message: {
        type: String,
        required: true,
        default: faker.lorem.paragraph(),
    },
    avatar: {
        type: String,
        required: true,
        default: faker.image.avatar(),
    },
}, {
    timestamps: true,
});

EntradaSchema.methods.toJSON = function () {
    const { _id, updatedAt, avatar, ...entrada } = this.toObject();
    entrada.id = _id;
    entrada.avatar = String(avatar).includes('http') ? avatar : `/img/${avatar}`;

    return entrada;
}

module.exports = model('Entrada', EntradaSchema);
