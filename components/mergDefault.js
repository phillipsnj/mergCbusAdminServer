Vue.component('mergDefault', {
    name: "mergDefault",
    //mixins: [nodeMixin],
    data: function () {
        return {
            nodeId: 0,
            headers: [
                {text: 'id', value: 'id'},
                {text: 'nodeId', value: 'nodeId'},
                {text: 'eventId', value: 'eventId'},
                {text: 'type', value: 'type'},
                {text: 'status', value: 'status'},
                {text: 'count', value: 'count'}
            ]
        }
    },
    mounted() {
        this.nodeId = this.$store.state.selected_node_id
    },
    computed : {
        node: function () {
            return this.$store.state.nodes[this.$store.state.selected_node_id]
        }
    },
    methods : {
        getEvents() {
            console.log(`mergDefault - NERD : ${this.nodeId}`)
            this.$root.send('NERD', {'nodeId': this.nodeId})
        }
    },
    template: `
        <v-container>
            <v-tabs>
                <v-tab :key="1">Info</v-tab>
                <v-tab :key="2">Variables</v-tab>
                <v-tab :key="3"  @click="getEvents()">Events</v-tab>
                <v-tab-item :key="1">
                    <nodeInfo :nodeId="node.node"></nodeInfo>
                </v-tab-item>
                <v-tab-item :key="2">
                    <nodeVariables :nodeId="node.node"></nodeVariables>
                </v-tab-item>
                <v-tab-item :key="3">
                    <nodeEvents :nodeId="node.node"></nodeEvents>
                </v-tab-item>
            </v-tabs>
            <p>{{ JSON.stringify(node) }}</p>
        </v-container>
    `
})