var os = require('os');
const net = require('net');
var iface = os.networkInterfaces();
// This file is called ONLY if no master is present.
console.log('I am the master node.');

// setPort from earlier is used to define listening port.
const server = net.createServer({ allowHalfOpen: false }, function(socket) {
  console.log('Master is listening');
  socket.on('end', function() {
    console.log('node disconnected');
  });
  socket.write('>' + Math.round((Math.random() * 100) + 1));
  socket.pipe(socket);
});
server.on('error', function(err) {
  throw err;
});
if (os.platform() == 'linux') {
  var host = iface['eth0'][0]['address'];
} else if (os.platform() == 'win32') {
  var host = iface['Ethernet'][1]['address'];
}
var masTime = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "May", "Aug", "Sept", "Oct", "Nov", "Dec"];
server.listen(setPort, function() {
    console.log('Chained as master');
    console.log(host + ':' + setPort);
});
console.log("started on: " + months[masTime.getMonth()] + " " + masTime.getDate() + " " + masTime.getFullYear() + " at " + masTime.getHours() + ":" + masTime.getMinutes());
