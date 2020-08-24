'use strict';
var express = require('express');
var app = express();
var http = require('http').createServer(app);
const jsonfile = require('jsonfile')

const NET_PORT = 5550;
const NET_ADDRESS = "192.168.8.123"

let layoutDetails = jsonfile.readFileSync('./layoutDetails.json')

app.use(express.static('.'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

const admin = require('./mergAdminNode.js')

const file = './nodeConfig.json'

let node = new admin.cbusAdmin(file,NET_ADDRESS,NET_PORT);

const websocket_Server = require('./wsserver');

websocket_Server(http, node);

