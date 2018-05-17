const uuidv4 = require('uuid/v4');
var dgram = require('dgram');
var dgramSocket = dgram.createSocket('udp4');
var ADRESSE_IP = '239.255.22.19';
const TIME = 1000;
const PORT = 3205;


var instrument = new Map();

instrument.set("piano", "ti-ta-ti");
instrument.set("trumpet", "pouet");
instrument.set("flute", "trulu");
instrument.set("violin", "gzi-gzi");
instrument.set("drum", "boum-boum");


var intrumentChoose = process.argv[2];

var uuidAEnvoyer = uuidv4();


var message = JSON.stringify({uuid: uuidAEnvoyer, sound: instrument.get(intrumentChoose), activeSince: new Date()});

setInterval(function(){

dgramSocket.send(message,0,message.length,PORT,ADRESSE_IP,function(err,bytes){
    console.log("Message send" + message);
});


},TIME);

