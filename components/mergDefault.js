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
    computed: {
        node: function () {
            return this.$store.state.nodes[this.$store.state.selected_node_id]
        }
    },
    methods: {
        getEvents() {
            console.log(`mergDefault - NERD : ${this.nodeId}`)
            this.$root.send('NERD', {'nodeId': this.nodeId})
        }
    },
    template: `
        <v-container>
            <h1>mergDefault</h1>
            <v-tabs>
                <v-tab :key="1">Info</v-tab>
                <v-tab :key="2">Variables</v-tab>
                <v-tab :key="3" @click="getEvents()">Events</v-tab>
                <v-tab-item :key="1">
                    <nodeInfo :nodeId="node.node"></nodeInfo>
                </v-tab-item>
                <v-tab-item :key="2">
                    <merg-default-node-variables :nodeId="node.node"></merg-default-node-variables>
                </v-tab-item>
                <v-tab-item :key="3">
                    <merg-default-node-events :nodeId="node.node"></merg-default-node-events>
                </v-tab-item>
            </v-tabs>
            <p>{{ JSON.stringify(node) }}</p>
        </v-container>
    `
})

Vue.component('merg-default-node-variables', {
    name: "merg-default-node-variables",
    props: ['nodeId'],
    mounted() {
        for (let i = 1; i <= this.node.parameters[6]; i++) {
            this.$root.send('NVRD', {"nodeId": this.nodeId, "variableId": i})
        }
    },
    computed: {
        node: function () {
            return this.$store.state.nodes[this.nodeId]
        },
    },
    template: `
        <v-container>
            <h3>Node Variables</h3>
            <v-row>
                <node-variable v-bind:nodeId="node.node"
                               v-bind:varId="n"
                               v-for="n in node.parameters[6]"
                               :key="n">

                </node-variable>
            </v-row>
            <p>{{ node.variables }}</p>
        </v-container>`
})

Vue.component('merg-default-node-events', {
    name: "merg-default-node-events",
    props: ['nodeId'],
    data: function () {
        return {
            eventDialog: false,
            editedEvent: {event: "0", variables: [], actionId: 1},
            headers: [
                {text: 'Event Name', value: 'event'},
                {text: 'Action ID', value: 'actionId'},
                {text: 'Actions', value: 'actions', sortable: false}
            ]
        }
    },
    methods: {
        editEvent: function (item) {
            console.log(`editEvent(${item.event})`)
            for (let i = 1; i <= this.node.parameters[5]; i++) {
                this.$root.send('REVAL', {"nodeId": this.nodeId, "actionId": item.actionId, "valueId": i})
            }
            this.eventDialog = true
            this.editedEvent = item

        },
        deleteEvent: function (event) {
            console.log(`deleteEvent : ${this.node.node} : ${event}`)
            this.$root.send('EVULN', {"nodeId": this.node.node, "eventName": event})
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
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Events for {{ node.node }}</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="eventDialog" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Edit Event</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <merg-default-node-event-variables
                                                        v-bind:nodeId="nodeId"
                                                        v-bind:actionId="editedEvent.actionId">
                                                </merg-default-node-event-variables>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="blue darken-1" text @click="editEvent(item)" outlined>Edit</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteEvent(item)" outlined>Delete</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <p>{{ $store.state.nodes[this.nodeId].actions }}</p>
        </v-container>`
})

Vue.component('merg-default-node-event-variables', {
    name: "merg-default-node-event-variables",
    props: ['nodeId', 'actionId'],
    mounted() {
        console.log(`merg-default-node-event-variables mounted : ${this.nodeId} :: ${this.actionId}`)
        for (let i = 1; i <= this.node.parameters[5]; i++) {
            this.$root.send('REVAL', {"nodeId": this.nodeId, "actionId": this.actionId, "valueId": i})
        }
    },
    computed: {
        node: function () {
            return this.$store.state.nodes[this.nodeId]
        }
    }/*,
    methods: {
        getEventVariables: function (actionId) {
            console.log(`getEventVariables(${actionId})`)
            for (let i = 1; i <= this.node.parameters[5]; i++) {
                this.$root.send('REVAL', {"nodeId": this.nodeId, "actionId": actionId, "valueId": i})
            }
        }
    }*/,
    template: `
        <v-container>
            <h3>Event Variables</h3>
            <p>{{ node.actions[actionId] }}</p>
            <v-row>
                <node-event-variable v-bind:nodeId="nodeId"
                                     v-bind:actionId="actionId"
                                     v-bind:varId="n"
                                     v-for="n in node.parameters[5]"
                                     :key="n">

                </node-event-variable>
            </v-row>
            <p>{{ node.actions[actionId] }}</p>
        </v-container>`
})