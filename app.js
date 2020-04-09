const express = require('express')
const app = express()

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
    console.log('Nuevo usuario se ha conectado');

    //default username
    socket.username = 'Anonimo'

    //escuchar cambio de username
    socket.on('cambiar_username', (data) => {
        socket.username = data.username;
        console.log('Nuevo nombre de usuario recibido:' + socket.username);
    })

    //Escuchar nuevos mensajes
    socket.on("nuevo_mensaje", (data) => {
        //emitir el nuevo mensaje
        io.sockets.emit('nuevo_mensaje', {mensaje: data.mensaje, username: socket.username});
    })

    //Escuchar escribiendo (evento)
    /* socket.on('escribiendo', (data) => {
        socket.broadcast.emit("escribiendo", {username: socket.username})
    }) */
})