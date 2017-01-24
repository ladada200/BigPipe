/*
  Project: BigPipe -- Work in progress.
  Current Authors:
  Christopher Rupert - Lead.
*/
var cluster = require('cluster');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os');

require('./libs/clusterfunctions.js');

// preDefined Variables.

var numCPUs = os.cpus().length;
var iface = os.networkInterfaces();
var hostname = os.hostname();
var ipAddress = iface['Ethernet'][1]['address'];
var macAddress = iface['Ethernet'][1]['mac'];
var fullID = iface['Ethernet'][0]['address'];

// Converts bites to bytes to megs to gigs etc..
function spcnvrtr(data) {
  if (data > 1000) {
    return (data / 1000).toFixed(2) + "G";
  } else if (data > 100) {
    return (data / 100).toFixed(2) + "M";
  } else {
    return (data);
  }
}

function testArray(arraySet) {
  var a = 0
  arraySet.forEach(function(element) {
    function ismas(data) {
      if (data == 0) {
        return "instruction core";
      } else {
        return "node core: " + data;
      }
    }
    console.log(ismas(a) + " has been idle for " + Math.round(new Date(arraySet[a]['times']['idle']).getMinutes()) + " minutes");
    a = a + 1;
  });
}

console.log("hostname: " + hostname);
console.log("ip address: " + ipAddress);
console.log("mac address: " + macAddress);
console.log("ID: " + fullID);
console.log("Operating System: " + os.type());
console.log("CPU Speed: " + spcnvrtr(os.cpus()[0]['speed']) + "hz for " + numCPUs + " cores");
testArray(os.cpus());

/*
setInterval(function() {
  console.log('load average: ' + os.loadavg());
  console.log('memory load: ' + os.totalmem());
}, 1000);
*/
require('./libs/callouts.js');
setTimeout(function() {
  if (nodes.length <= 0) {
    console.log('Preparing for next stages.');
  }
}, (25600));
