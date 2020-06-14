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
                {text: 'coe', value: 'coe'},
                {text: 'Actions', value: 'actions', sortable: false }
            ],
            dialog: false,
            nodeComponent: 'mergDefault',
            selectedNode: {}
        }
    },
    methods: {
        QNN: function () {
            //socket.emit('QNN')
            this.$root.send('QNN')
        },
        getParameters: function (node_id) {
            console.log(`getParameters ${node_id}`)
            for (let i = 1; i < 9; i++) {
                socket.emit('RQNPN', {"nodeId": node_id, "parameter": i})
            }
        },
        editNode(node) {
            console.log(`Edit Node ${node.node}`)
            this.$store.state.selected_node_id = node.node
            this.$store.state.display_component = 'mergDefault'
        }
    },
    template: `<div>
                    <v-container>
                    <v-toolbar light>
                        <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items >
                            <v-btn color="success" v-on:click="QNN">QNN()</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                    <v-data-table :headers="headers" 
                                  :items="Object.values($store.state.nodes)" 
                                  item-key="node" 
                                  class="elevation-1" >
                        <template v-slot:item.actions="{ item }">
                            <v-btn color="blue darken-1" text @click="editNode(item)" outlined>Edit</v-btn>
                        </template>
                    </v-data-table>
                    <div>
                        <h3>Raw Node Data</h3>
                        <div v-for="node in $store.state.nodes" :key="node.node">
                            <p>{{ JSON.stringify(node) }}</p>
                        </div>
                    </div>
                    </v-container>
            </div>`
})