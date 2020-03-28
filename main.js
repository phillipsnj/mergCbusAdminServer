/*const Vue = require('vue')
const Vuetify =require('vuetify')

Vue.use(Vuetify);*/
var socket = io.connect();

socket.on('events', function (data) {
    app.events = data;
});

socket.on('nodes', function (data) {
    app.nodes = data;
});

Vue.component('test', {
    template: `<h2>Test Component</h2>`
})

/*let store = {
    events:[],
    nodes:[]
}*/

var app = new Vue({
    el: "#app",
    data: {
        title: "MERG CbusServer - Admin",
        display_item:"nodes_list",
        drawer:false,
        events: [],
        nodes: []
    }
})
