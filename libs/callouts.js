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
var nodes = [];
var itter = 0;
// Functions
function searchHost(searchPort) {
  console.log('[!] scanning for master');
  var i = 0;
  nodes = [];
  var searchMe = '0.0.0.0';

  while (i < 256) {
      (function(searchPort) {
        if (fromHost + i == host) {
          searchMe = fromHost + (i + 1);
        } else {
          searchMe = fromHost + i;
        }
      const client = net.connect(searchPort, searchMe, function() {
        //console.log('[!] ' + searchMe);
      });
      client.on('data', function(data) {
        if (data.toString().contains(":")) {
            nodes.push(data.toString());
            console.log('[!] Found Master!');
            console.log('[>] ' + nodes[0]);
            client.end();
            var getPort = nodes[0].split(":");
            console.log(`Will connect on new port: ${getPort}`);
            const expC = net.connect(getPort[1], getPort[0], function() {
              expC.on('data', function(data) {
                console.log(data.toString());
              });
            });
        } else {
            console.log(data.toString());
        }
        //console.log(nodes);
      });
      client.on('end', function() {
        console.log('[!] Dropped circuit/ Master is offline.');
      });
      client.on('error', function(err) {
        if (err['code'] == 'ECONNRESET') {
          console.log('[!] connection was reset by host.');
        } else {

        }
      });
      //console.log('> ' + fromHost + i + ":" + searchPort);
    })(searchPort);
      i++;
  }
}
    //searchHost(Math.round(Math.random() * 1000) * 9);

searchHost(setPort);
setTimeout(function() {
  if (nodes.length > 0) {
    console.log('[!] Mater is ' + nodes[0]);

  } else {
    console.log('[-] Preparing for next stages.');
    require('./master.js');
  }
}, 5000);
