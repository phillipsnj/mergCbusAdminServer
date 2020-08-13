/*const Vue = require('vue')
const Vuetify =require('vuetify')
*/
//import Vue from 'vue'
//import vuetify from '@/plugins/vuetify' // path to vuetify export
//import Vuex from 'vuex'

Vue.use(Vuetify);

Vue.use(Vuex)
//import store from './store'

const store = new Vuex.Store({
    state: {
        title: 'CbusServer Setup',
        subTitle: 'Alpha',
        nodes: [],
        events: [],
        cbusErrors:[],
        dccErrors:[],
        raw:{},
        layout:{},
        display_component: "nodes-list",
        node_component: "nodeInfo",
        selected_node_id: 0,
        selected_action_id: "",
        canmio_happening_actions: {},
        canmio_event_actions: {},
        debug : false,
        colours :["black","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","blue-grey","grey"]
    }
})

var socket = io.connect();

socket.on('events', function (data) {
    store.state.events = data;
});

socket.on('nodes', function (data) {
    // console.log(`Nodes Received:${JSON.stringify(data)}`)
    store.state.nodes = data;
});

socket.on('dccError', function (data) {
    // console.log(`Dcc Errors Received:${JSON.stringify(data)}`)
    store.state.dccErrors = data;
});

socket.on('cbusError', function (data) {
    // console.log(`CBUS Errors Received:${JSON.stringify(data)}`)
    store.state.cbusErrors = data;
});

socket.on('layoutDetails', (data) => {
    store.state.layout = data;
})

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
    store,
    vuetify: new Vuetify(vuetifyOptions),
    data: {
        title: " ",
        display_component:"nodes-list",
        drawer:true,
        events: [],
        nodes: [],
        dccErrors: [],
        cbusErrors:[]
    },
    methods : {
        send(type, data) {
            socket.emit(type,data)
        }
    }/*,
    created() {
        socket.on('nodes', function (data) {
            //console.log(`Nodes Received:${JSON.stringify(data)}`)
            this.$store.state.nodes = data;
        })
    }*/
})
