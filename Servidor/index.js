const express= require ("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(require('./routes/obrasarte'));
app.use(require('./routes/artistas'));

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log('El servidor escucha en el puerto ' + PORT);
});

module.exports = app;