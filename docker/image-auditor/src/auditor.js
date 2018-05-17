/*var dgram = require('dgram');
var dgramSocket = dgram.createSocket('udp4');
var ADRESSE_IP = '239.255.22.19';
const TIME = 5000;
const PORT = 3205;
const PORT_TCP = 2205;
var net = require('net');

var instrument = new Map();

instrument.set("piano", "ti-ta-ti");
instrument.set("trumpet", "pouet");
instrument.set("flute", "trulu");
instrument.set("violin", "gzi-gzi");
instrument.set("drum", "boum-boum");

var musicianArray = [];


dgramSocket.bind(PORT,	function()	{
    console.log("musician arrive");
	dgramSocket.addMembership(ADRESSE_IP);
});


dgramSocket.on('message',	function(msg)	{

    var  musician = JSON.parse(msg);
    for (var i = 0; i < musicianArray.length; i++){
        if(musician.uuid == musicianArray[i].uuid){
            musicianArray[i].activeSince = musician.activeSince;
        }else {
             musicianArray.push(musician);
        }
    }
});






var netTcp = net.createServer();

netTcp.on('connection', function(msg){

       musicianArray.forEach(musician => {

            var index = musicianArray.indexOf(musician);

            // if the musician didn't play for a time, we remove it
            if(moment(new Date()).diff(musician[i].activeSince) > TIME){
                console.log('This musician is not here for too long\n' + JSON.stringify(musicianArray[index],null,'\t'));
                musicianArray.splice(index, 1);
            }
        })


    msg.write(JSON.stringify(musicians,null,'\t') + "\n");
    msg.end();

});

netTcp.listen(PORT_TCP);*/


var dgram = require('dgram');
var net = require('net');
var moment = require('moment');
var s = dgram.createSocket('udp4');

var musicians = new Map();

s.on('message', function(msg, source){
	console.log("received" + msg);
	var musician = JSON.parse(msg);
	if(musicians.has(musician.uuid)){
		musicians.get(musician.uuid).lastUpdate = moment();
	}else{
			mus = new Object();
			mus.uuid = musician.uuid;
			mus.instrument = musician.instrument;
			mus.activeSince = moment();
			mus.lastUpdate = moment();
			musicians.set(mus.uuid, mus);
	}
});

s.on('listening', function(){
  console.log("listening...");
});

s.bind(2205, function(){
	s.addMembership("239.255.22.5");
});

var server = net.createServer(function(socket) {
	var arrayToSend = [];
	musicians.forEach( function(value, key, musicians){
		console.log("INSIDE FOREACH");
		if(value.lastUpdate.isAfter(moment().subtract(5, 'seconds'))){
			var mu = new Object();
			mu.uuid = key;
			mu.instrument = value.instrument;
			mu.activeSince = value.activeSince;
			arrayToSend.push(mu);
		}
	});
	socket.write(JSON.stringify(arrayToSend)+"\r\n");
	socket.end();
});

server.listen(2205);