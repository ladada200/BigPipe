var os = require('os');
const net = require('net');
var iface = os.networkInterfaces();
var events = require('events');
const dgram = require('dgram');
const udpserver = dgram.createSocket('udp4');
var clientList = [];
// This file is called ONLY if no master is present.
// setPort from earlier is used to define listening port.
if (os.platform() == 'linux') {
  var host = iface['eth0'][0]['address'];
} else if (os.platform() == 'win32') {
  var host = iface['Ethernet'][1]['address'];
}

var eventEmitter = new events.EventEmitter();

const server = net.createServer({pauseOnConnect: false}, function(socket) {
  socket.once('data', function(data) {
    console.log(data.toString());
  });
  if (socket.remoteFamily != "IPv4") {
    newKey = socket.remoteAddress.split(":");
    forKey = newKey[3];
  } else {
    forKey = socket.remoteAddress;
  }
      console.log('[+] ' + forKey + ' connected as node');

  clientList.push({node: forKey});
  socket.on('end', function() {
    console.log('[!] Disconnect from client');
  });
  socket.on('error', function(err) {
    if (err['code'] == 'ECONNRESET') {
      console.log('[!] connection was reset by client.');
    } else {
      console.log('[!] connection reset by node');
    }
  });
  const randPort = Math.round((Math.random() * 1000) + 9096);
  var nsetP = randPort;
  socket.resume();
  socket.write(host + ":" + nsetP);
  socket.pipe(socket);
  socket.write('challenge');
  socket.pipe(socket);
  //socket.connect({host: host, port: nsetP});
  udpserver.on('listening', () => {
    var address = udpserver.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });
  udpserver.bind({address: localhost,
    port: nsetP,
    exlusive: true});
  udpserver.send("Hello World");
});

server.on('error', function(err) {
  if (err['code'] == 'ECONNRESET') {
    console.log('[!] connection was reset by client.');
  } else {
    console.log('[!] connection reset by node');
  }
});

udpserver.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});


var masTime = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "May", "Aug", "Sept", "Oct", "Nov", "Dec"];

server.listen(setPort, function() {
    console.log('[+] Chained as master');
    console.log('[+] Our IP is ' + host + ':' + setPort);

});
console.log("[~] started on: " + months[masTime.getMonth()] + " " + masTime.getDate() + " " + masTime.getFullYear() + " at " + masTime.getHours() + ":" + masTime.getMinutes());
