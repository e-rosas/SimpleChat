$(function(){
    //hacer conexion
    var socket = io.connect('http://localhost:3000')

    //botones y entradas
    var mensaje = $("#mensaje");
    var username = $("#username");
    var enviar_mensaje = $("#enviar_mensaje");
    var enviar_username = $("#enviar_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //Emitir cambio de username
    enviar_username.click(function() {
        console.log("Nuevo nombre de usuario: " + username.val());
        socket.emit('cambiar_username', {username: username.val()})
    })

    //Emitir mensaje
    enviar_mensaje.click(function(){
        socket.emit('nuevo_mensaje', {mensaje: mensaje.val(), username: username.val()});
        mensaje.val('');
        mensaje.focus();
    })

    //Escuchar en nuevo mensaje
    socket.on("nuevo_mensaje", (data) => {
        console.log("mensaje nuevo:" + data);
        chatroom.append("<p class='message'>" + data.username + ": " + data.mensaje + "</p>");
    })

    //Emitir escribiendo
    /* mensaje.bind("keypress", () => {
        socket.emit('escribiendo');
    }) */

    //Escuchar escribiendo (evento)
    /* socket.on('escribiendo', (data) => {
        feedback.html("<p><i>"+ data.username + " esta escribiendo..." + "</i></p>")
    }) */
});