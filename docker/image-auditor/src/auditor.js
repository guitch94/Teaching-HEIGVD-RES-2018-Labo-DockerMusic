var dgram = require('dgram');
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

netTcp.listen(PORT_TCP);