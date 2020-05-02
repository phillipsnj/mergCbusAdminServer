'use strict';
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const NET_PORT = 5550;
const NET_ADDRESS = "192.168.8.200"

app.use(express.static('.'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('an user connected')
    node.cbusSend(node.QNN())
    socket.on('QNN', function(){
        console.log('QNN Requested');
        node.cbusSend(node.QNN())
    })
    socket.on('RQNPN', function(data){ //Request Node Parameter
        console.log(`RQNPN ${JSON.stringify(data)}`);
        node.cbusSend(node.RQNPN(data.nodeId, data.parameter))
    })
    socket.on('NVRD', function(data){
        console.log(`NVRD ${JSON.stringify(data)}`);
        node.cbusSend(node.NVRD(data.nodeId, data.variableId))
    })
    socket.on('NVSET', function(data){
        console.log(`NVSET ${JSON.stringify(data)}`);
        node.cbusSend(node.NVSET(data.nodeId, data.variableId, data.variableValue))
        node.cbusSend(node.NVRD(data.nodeId, data.variableId))
    })
    socket.on('NERD', function(data){
        console.log(`NERD ${JSON.stringify(data)}`);
        node.cbusSend(node.NERD(data.nodeId))
    })
    socket.on('REVAL', function(data){
        console.log(`REVAL ${JSON.stringify(data)}`);
        node.cbusSend(node.REVAL(data.nodeId, data.actionId, data.valueId))
    })
    socket.on('EVLRN', function(data){
        console.log(`EVLRN ${JSON.stringify(data)}`);
        node.cbusSend(node.NNLRN(data.nodeId))
        node.cbusSend(node.EVLRN(data.eventName, data.eventId, data.eventVal))
        node.cbusSend(node.NNULN(data.nodeId))
        node.cbusSend(node.REVAL(data.nodeId, data.actionId, data.eventId))
        node.cbusSend(node.NNULN(data.nodeId))
        node.cbusSend(node.NERD(data.nodeId))
        node.cbusSend(node.RQEVN(data.nodeId))
    })
    socket.on('EVULN', function(data){
        console.log(`EVULN ${JSON.stringify(data)}`);
        node.cbusSend(node.NNLRN(data.nodeId))
        node.cbusSend(node.EVULN(data.eventName.event, data.eventName.actionId, data.eventName.eventVal))
        node.cbusSend(node.NNULN(data.nodeId))
        node.removeNodeEvents(data.nodeId)
        node.cbusSend(node.NERD(data.nodeId))
        node.cbusSend(node.RQEVN(data.nodeId))
    })
});

/*io.on('QNN', function(){
    console.log('QNN Requested');
    node.cbusSend(node.QNN())
})*/

http.listen(3000, function(){
    console.log('listening on *:3000');
});

const admin = require('./mergAdminNode.js')


const file = './nodeConfig.json'

let node = new admin.cbusAdmin(file,NET_ADDRESS,NET_PORT);

node.on('events', function (events) {
    console.log(`Events :${JSON.stringify(events)}`)
    io.emit('events', events);
})

node.on('nodes', function (nodes) {
    //console.log(`Nodes Sent :${JSON.stringify(nodes)}`)
    io.emit('nodes', nodes);
})

node.on('cbusError', function (cbusErrors) {
    console.log(`CBUS - ERROR :${JSON.stringify(cbusErrors)}`)
    io.emit('cbusError', cbusErrors);
})

node.on('dccError', function (error) {
    console.log(`CBUS - ERROR :${JSON.stringify(error)}`)
    io.emit('dccError', error);
})

node.on('cbus', function (task) {
    console.log(`cbus :${JSON.stringify(task)}`)
})

