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

var musicians = [];
var moment = require('moment')

/* --------------------- TCP SERVER --------------------------------------------*/
var net = require('net');
var servertcp = net.createServer();

servertcp.on('connection', function (socket) {

    clearMusicians();
    socket.write(JSON.stringify(musicians,null,'\t') + "\n");
    socket.end();

});

function clearMusicians() {

    musicians.forEach(musician => {

        var i = musicians.indexOf(musician);

        // if the musician didn't play for a time, we remove it
        if(moment(new Date()).diff(musicians[i].activeSince) > 5000){
            console.log('This musician is leaving\n' + JSON.stringify(musicians[i],null,'\t'));
            musicians.splice(i, 1);
        }
    });
}

servertcp.listen(2205);

/* --------------------- UDP SERVER --------------------------------------------*/

var dgram = require('dgram');
var serverudp = dgram.createSocket('udp4');

serverudp.on('message', function (msg, source) {

    var musician = JSON.parse(msg);
    addMusician(musician);

});

function addMusician(musician)
{
    for (var i = 0; i < musicians.length; i++) {

        // update the attribute activeSince if the musician is already present
        if (musician.uuid == musicians[i].uuid) {
            musicians[i].activeSince = musician.activeSince;
            return;
        }
    }

    // add to the musicians if not present
    console.log("This musician is playing\n" + JSON.stringify(musician,null,'\t'));
    musicians.push(musician);
}

serverudp.bind(3205, function () {

    console.log('An auditor is joining multicast group...\n');
    serverudp.addMembership('239.255.22.19');

});