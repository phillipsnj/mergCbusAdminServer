Vue.component('nodes_list', {
    name: "nodes_list",
    //props: ['nodes'],
    data: function () {
        return {
            headers: [
                {text: 'id', value: 'id'},
                {text: 'manuf', value: 'manuf'},
                {text: 'module', value: 'module'},
                {text: 'consumer', value: 'consumer'},
                {text: 'producer', value: 'producer'},
                {text: 'flim', value: 'flim'},
                {text: 'bootloader', value: 'bootloader'},
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
                        <v-toolbar-title>{{ this.$root.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items >
                            <v-btn color="success" v-on:click="QNN">QNN()</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-container>
                            <v-card>
                                <v-toolbar dark color="primary">
                                <v-btn icon dark @click="dialog = false">
                                <v-icon>close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Node : {{ selectedNode.node }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                <v-btn dark flat @click="dialog = false">Save</v-btn>
                                </v-toolbar-items>
                                </v-toolbar>
                                <component v-bind:is="nodeComponent" v-bind:node="selectedNode"></component>
                            </v-card>
                            </v-container>
                        </v-dialog>
                    
                    <v-data-table :headers="headers" :items="Object.values(this.$root.nodes)" item-key="node" class="elevation-1" >
                        <template v-slot:items="props">
                            <tr @click="editNode(props.item)">
                                <td>{{ props.item.node }}</td>
                                <td>{{ props.item.manuf }}</td>
                                <td>{{ props.item.module }}</td>
                                <td>{{ props.item.consumer }}</td>
                                <td>{{ props.item.producer }}</td>
                                <td>{{ props.item.flim }}</td>
                                <td>{{ props.item.bootloader }}</td>
                                <td>{{ props.item.coe }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                    <div>
                        <h3>Raw Node Data</h3>
                        <div v-for="node in this.$root.nodes" :key="node.node">
                            <p>{{ JSON.stringify(node) }}</p>
                        </div>
                    </div>
                    </v-container>
            </div>`
})