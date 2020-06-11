/*const Vue = require('vue')
const Vuetify =require('vuetify')
*/
//import Vue from 'vue'
//import vuetify from '@/plugins/vuetify' // path to vuetify export


Vue.use(Vuetify);

var socket = io.connect();

socket.on('events', function (data) {
    app.events = data;
});

socket.on('nodes', function (data) {
    // console.log(`Nodes Received:${JSON.stringify(data)}`)
    app.nodes = data;
});

socket.on('dccError', function (data) {
    // console.log(`Dcc Errors Received:${JSON.stringify(data)}`)
    app.dccErrors = data;
});

socket.on('cbusError', function (data) {
    // console.log(`CBUS Errors Received:${JSON.stringify(data)}`)
    app.cbusErrors = data;
});

Vue.component('test', {
    template: `<h2>Test Component</h2>`
})

/*let store = {
    events:[],
    nodes:[]
}*/
const vuetifyOptions = { }

var app = new Vue({
    el: "#app",
    vuetify: new Vuetify(vuetifyOptions),
    data: {
        title: "MERG CbusServer - Admin",
        display_item:"nodes_list",
        drawer:true,
        events: [],
        nodes: [],
        dccErrors: [],
        cbusErrors:[]
    }
})
