const express = require('express'); //Require the express moule
const app = express() //create a new express application
const http = require('http').Server(app) //require the http module
const io = require('socket.io'); // require the socket.io module

const port = 5500;
const socket = io(http); //create an event listener

app.get('/', (req, res) => {
	res.send('Hello world')
})

//To listen to messages
socket.on('connection', (socket)=>{
	console.log('user connected');
});

//wire up the server to listen to our port 500
http.listen(port, () => {
	console.log('connected to port: '+ port)
});