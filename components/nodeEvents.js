Vue.component('nodeEvents', {
    name: "nodeEvents",
    props: ['nodeId'],
    data: function () {
        return {
            headers: [
                {text: 'Event Name', value: 'event'},
                {text: 'Action ID', value: 'actionId'},
            ]
        }
    },
    mounted() {
        if (this.node.EvCount > 0) {
            console.log(`NERD : ${this.nodeId}`)
            this.$root.send('NERD', {"nodeId": this.nodeId})
        }
    },
    computed: {
        node: function () {
            return this.$store.state.nodes[this.nodeId]
        },
        eventList: function () {
            return Object.values(this.$store.state.nodes[this.nodeId].actions)
        }
    },
    template: `
        <v-container>
            <h3>Event Variables</h3>
            <v-card>
                <v-data-table :headers="headers"
                              :items="eventList"
                              :items-per-page="20"
                              class="elevation-1"
                              item-key="id">
                </v-data-table>
            </v-card>
            <p>{{ $store.state.nodes[this.nodeId].actions }}</p>
        </v-container>`
})