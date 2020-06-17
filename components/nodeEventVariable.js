Vue.component('node-event-variable', {
    name: "node-event-variable",
    props: ["nodeId", "actionId", "varId", "name"],
    data: () => ({
        rules: [
            value => value >= 0 || 'Cannot be a negative number',
            value => value <= 255 || 'Number to High'
        ],
        label: "",
        variableLocal: 0,
        eventName: ""
    }),
    mounted() {
        console.log(`nodeEventVariable Mounted : ${this.$store.state.nodes[this.nodeId].actions[this.actionId].variables[this.varId]}`)
        this.variableLocal = this.$store.state.nodes[this.nodeId].actions[this.actionId].variables[this.varId]
        this.eventName = this.$store.state.nodes[this.nodeId].actions[this.actionId].event
        if (this.name) {
            this.label = this.name
        } else {
            this.label = `Event Variable ${this.varId}`
        }
    },
    watch: {
        variableValue() {
            this.variableLocal = this.$store.state.nodes[this.nodeId].actions[this.actionId].variables[this.varId]
        }
    },
    computed: {
        variableValue: function() {
            return this.$store.state.nodes[this.nodeId].actions[this.actionId].variables[this.varId]
        }
    },
    methods: {
        updateEV: function () {
            console.log(`Update Event Variable : ${this.node} : ${this.action}`)
            this.$root.send('EVLRN', {
                "nodeId": this.nodeId,
                "actionId": this.actionId,
                "eventName": this.eventName,
                "eventId": this.varId,
                "eventVal": this.variableLocal
            })
        }
    },
    template: `
        <v-card class="xs6 md3 pa-3" flat>
            <v-text-field
                    :label="label"
                    v-model="variableLocal"
                    outlined
                    :rules="rules"
                    @change="updateEV"
            >
            </v-text-field>
        </v-card>`
})

