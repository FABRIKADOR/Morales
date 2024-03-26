const express= require ("express");
var jwt = require('jsonwebtoken');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.post('/login', (req, res) =>{

    const { correo , password } = req.body

    // SUPONGAMOS QUE YA VERIFICAMOS QUE EXISTE EL USUARIO POR CORREO

    let token = jwt.sign( { id_usuario: 2 , nombre: 'Catalan' } , 'secret' )

    return res.send(token)

})

app.use( (req, res, next) => {

    console.log(req.headers)
    const token = req.headers["authorization"]
    
    console.log(token);

    if( !token )
    {
        return res.status(401).json({
            error: "Sin autorizacion"
        })
    }

    const payload = jwt.verify( token , 'secreta' )

    console.log('payload');
    console.log(payload);
    next()

})

app.use(require('./routes/obrasarte'));
app.use(require('./routes/artistas'));

const PORT = process.env.PORT;





app.listen(PORT, ()=>{
    console.log('El servidor escucha en el puerto ' + PORT);
});

module.exports = app;