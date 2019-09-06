const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/file_html/index.html');
});
// io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  console.log('[' + socket.id + '].connected');
  // console.log(socket.id);
	// io.emit('chat', 'Hi');
	// socket.broadcast.emit('hi');

  socket.on('disconnect', function(){
    console.log('[a].disconnected');
  });
  socket.on('chat', function(msg){
  	console.log('chat');
  	console.log(msg);
  	const { to, from, value } = msg;
  	if (to=='admin') io.emit(from, value + ' R');
  	else io.emit(to, value + ' ' + from);

  	// socket.broadcast.emit("received", { message: msg  });
  });
  socket.on('notification', function(msg){
  	console.log('notification: ' + msg);
  });
});

// io.on('connection', function(socket){
//   // socket.broadcast.emit('chat message', 'hi');
//   console.log('[a].connected');
//   socket.on('disconnect', function(){
//     console.log('[a].disconnected');
//   });
//   socket.on('chat message' /*chat message adalah nama penampungnya*/, function (msg) {
//   	console.log('message: ' + msg);
//   	io.emit('chat message', msg + ' received');
//   })
// });

const port = 3300;
http.listen(port, function(){
  console.log('listening on *:' + port);
});
