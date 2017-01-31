/*
  Description:
  This file is designed to scan and perform callouts to supposed cluster nodes;
  if a master is found the node will perform a challenge to become a node.
  otherwise it will become its own master.

  NOTE: In a situation where multiple masters are needed a portion of this file
  should be edited as directedly below for both a new master and optional nodes.

*/
//Prereq
var os = require('os');
var net = require('net');
sock = new net.Socket();
sock.setMaxListeners(0);
// Initiate callouts;
var iface = os.networkInterfaces();
if (os.platform() == 'linux') {
  var host = iface['eth0'][0]['address'];
} else if (os.platform() == 'win32') {
  var host = iface['Ethernet'][1]['address'];
}

// Variables

var hport = Math.round((Math.random() * 1000) + 1);
// hport will be the host listening port for challenges only.
setPort = 9095;
// setPort is a user defined port for finding Master or clutser nodes.
var searchIP = host.split(".");
var fromHost = searchIP[0] + "." + searchIP[1] + "." + searchIP[2] + ".";
nodes = [];

// Functions
function searchHost(searchPort) {
  var i = 0;
  var searchMe = '0.0.0.0:9095';
  while (i < 256) {
      (function(searchPort) {
        searchMe = fromHost + i;
        console.log('trying: ' + searchMe + ':' + searchPort);
      const client = net.createConnection(searchPort, searchMe + i, function() {
        console.log('FOUND ' + searchMe);
      });
      client.on('data', function(data) {
        //nodes.push(data.toString());
        client.end();
      });
      client.on('end', function() {
        // console.log('Dropped circuit');
      });
      client.on('error', function(err) {
        if (err['code'] == 'ECONNRESET') {
          console.log('connection was reset by host.');
        }
      });
      //console.log('> ' + fromHost + i + ":" + searchPort);
    })(searchPort);
      i++;
  }
  console.log(searchPort);
  if (nodes.length <= 0) {
    console.log('No hosts found');
  } else {
    console.log(nodes);
  }
}
console.log('Scanning for Master...');
/*
function amIMaster(nodes, searchPort) {
  nodes.forEach(function(key) {
    net.createConnection(searchPort, key, function() {
      nodes.push(searchPort);
      console.log('FOUND: ' + searchPort);
    })
    sock.on('data', function(data) {
      console.log(data);
      sock.destroy();
    });
    sock.on('error', function(e) {
      sock.destroy();
    });
  });
}
*/
    //searchHost(Math.round(Math.random() * 1000) * 9);
searchHost(setPort);

if (nodes.length <= 0) {
  //amIMaster(nodes, setPort);
}
