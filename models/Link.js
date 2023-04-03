const mongoose = require('mongoose');

/*================DEFINIÇÃO DAS COLEÇÕES E DOCUMENTOS */
// Documento
const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    url: {
        type: String,
        required: true
    },
    click: {
        type: Number,
        default: 0
    }
})

// Definindo quais vão ser os atributos dos nossos documentos da coleção
module.exports = mongoose.model('Link', linkSchema)