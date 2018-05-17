var uuid = require('uuid/v4');
var dgram = require('dgram');
var dgramSocket = dgram.createSocket('udp4');
var ADRESSE_IP = '172.100.100.1';
var TIME = 1000;
var PORT = 3205;


var instrument = new Map();

instrument.set("piano", "ti-ta-ti");
instrument.set("trumpet", "pouet");
instrument.set("flute", "trulu");
instrument.set("violin", "gzi-gzi");
instrument.set("drum", "boum-boum");

var intrumentChoose = process.argv[2];

var message = JSON.stringify({uuid: uuid, sound: instrument.get(intrumentChoose)})

setInterval(function(){

dgramSocket.send(message,0,message.length,PORT,ADRESSE_IP,function(err,bytes)){
    console.log("Message send");
});


},TIME);

