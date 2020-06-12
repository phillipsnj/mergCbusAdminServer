Vue.component('nodes_list', {
    name: "nodes_list",
    //props: ['nodes'],
    data: function () {
        return {
            headers: [
                {text: 'node', value: 'node'},
                {text: 'manuf', value: 'manuf'},
                {text: 'module', value: 'module'},
                {text: 'consumer', value: 'consumer'},
                {text: 'producer', value: 'producer'},
                {text: 'flim', value: 'flim'},
                {text: 'status', value: 'status'},
                {text: 'coe', value: 'coe'}
            ],
            dialog: false,
            nodeComponent: 'mergDefault',
            selectedNode: {}
        }
    },
    methods: {
        QNN: function () {
            socket.emit('QNN')
        },
        getParameters: function (node_id) {
            console.log(`getParameters ${node_id}`)
            for (let i = 1; i < 9; i++) {
                socket.emit('RQNPN', {"nodeId": node_id, "parameter": i})
            }
        },
        editNode(node) {
            this.selectedNode = node
            this.dialog = true
        }
    },
    template: `<div>
                    <v-container>
                    <v-toolbar light>
                        <v-toolbar-title>{{ $root.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items >
                            <v-btn color="success" v-on:click="QNN">QNN()</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-data-table :headers="headers" 
                                  :items="Object.values($root.nodes)" 
                                  item-key="node" 
                                  class="elevation-1" >
                    </v-data-table>
                    <div>
                        <h3>Raw Node Data</h3>
                        <div v-for="node in $root.nodes" :key="node.node">
                            <p>{{ JSON.stringify(node) }}</p>
                        </div>
                    </div>
                    </v-container>
            </div>`
})