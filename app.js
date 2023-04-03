//Módulos
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const linkRoute = require('./routes/linkRoute.js')

const app = express();
const port = 3000;


/*====================CONEXÃO COM O BANCO=================== */
//Iniciar conexão com o Banco de dados
// .then(db => console.log(db));
mongoose.connect('mongodb://127.0.0.1/links')
let db = mongoose.connection;
db.on("error", () => console.log("Houve um erro"))
db.once("open", () => console.log("Banco carregado"))


/*====================ROTAS DA APLICAÇÃO=================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));


app.use('/', linkRoute);
app.listen(port, () => console.log("Listen on port " + port))
