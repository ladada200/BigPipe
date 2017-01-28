// This file is called ONLY if no master is present.
console.log('I am the master node.');
var net = require('net');
// setPort from earlier is used to define listening port.
var server = net.createServer((socket) => {
  socket.end('running');
}).on('error', (err) => {
  throw err;
});
var os = require('os');
var iface = os.networkInterfaces();
if (os.platform() == 'linux') {
  var host = iface['eth0'][0]['address'];
} else if (os.platform() = 'win32') {
  var host = iface['Ethernet'][1]['address'];
}
var masTime = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "May", "Aug", "Sept", "Oct", "Nov", "Dec"];
server.listen({
  host: host,
  port: setPort
});
console.log("started on: " + months[masTime.getMonth()] + " " + masTime.getDate() + " " + masTime.getFullYear() + " at " + masTime.getHours() + ":" + masTime.getMinutes());
