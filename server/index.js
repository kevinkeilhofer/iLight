//expressmodul nötig zu installieren
const express = require('express');
const app = express(); //erzeugt instanz
const bodyParser = require('body-parser');
const path = require('path');

const http = require('http');
const socketio = require('socket.io'); 


//Communication between Arduino and Backend
const pixel = require("node-pixel");
const firmata = require('firmata');
//board initialisierung
let board = new firmata.Board('/dev/cu.usbserial-AC013ENG',function(){

var strip = new pixel.Strip({
        strips: [ {pin: 6, length: 6}, ],
        firmata: board,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {
        // Set the entire strip to pink.
      strip.color('#F7FE2E');

      // Set first and seventh pixels to turquoise.
      // strip.pixel(0).color('colorChoice');
      // strip.pixel(5).color('#0000FF');

      // Display initial state.
      strip.show();

      // Loop the following command forever
      // at 12fps until Arduino powers down.
      let loop = setInterval(function () {
        // Shift all pixels clockwise
        strip.shift(1, pixel.FORWARD, true);
        strip.show();
      }, 1000 / 12);
  });
});
// 



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

const server = http.createServer(app); //webserver wird erzeugt
const io = socketio(server); //socket.io included

const routes = require('./routes/index')(io);
app.use('/', routes);

var port = 9000; //port zum öffnen im Browser

//gibt aus in der console was zu tun ist
server.listen(port, function() {
   console.log('running at localhost: ' + port);
});