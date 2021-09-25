const http = require('http');

const port = 9000;
var contador = 1;
/**
 * peticion -> request -> req 
 * respuesta -> response -> eres
 * **/
http.createServer(function (req,res){
    //te voy a responder con un mensaje a traves del metodo write
    
    //para el *codigo de estado*, si el proceso de respuesta ah sido exitoso
    //sengundo parametro el tipo de contenido
    res.writeHead(200, {'Content-type': 'text/html'});
    //res.writeHead(200, {'Content-type': 'text/plain'});
    res.write('<h'+contador+'>Respueta '+contador+'</h'+contador+'>');
    contador++;
    res.end();

}).listen(port);
//metodo listen parametro en que puerto lo va a esperar