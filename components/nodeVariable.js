Vue.component('nodeVariable', {
    name: "nodeVariable",
    props: ["nodeId", "varId", "name"],
    data: () => ({
        rules: [
            value => value >= 0 || 'Cannot be a negative number',
            value => value <= 255 || 'Number to High'
        ],
        label: "",
        variableLocal: 0
    }),
    mounted() {
        this.variableLocal = this.$store.state.nodes[this.nodeId].variables[this.varId]
        if (this.name) {
            this.label = this.name
        } else {
            this.label = `Variable ${this.varId}`
        }
    },
    watch: {
        variableValue() {
            this.variableLocal = this.$store.state.nodes[this.nodeId].variables[this.varId]
        }
    },
    computed: {
        variableValue: function() {
            return this.$store.state.nodes[this.nodeId].variables[this.varId]
        }
    },
    methods: {
        updateNV: function () {
            this.$root.send('NVSET', {
                "nodeId": this.nodeId,
                "variableId": this.varId,
                "variableValue": this.variableLocal
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
                    @change="updateNV"
            >
            </v-text-field>
        </v-card>`
})

Vue.component('nodeVariable2', {
    name: "nodeVariable2",
    template: `<h1>Node Variable Component 2</h1>`
})