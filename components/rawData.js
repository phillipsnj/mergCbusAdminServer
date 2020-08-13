Vue.component('raw-data', {
    name: "raw-data",
    //props: ['events'],
    data: () => ({}),
    computed: {
        nodes: function () {
            return this.$store.state.nodes
        },
        events() {
            return this.$store.state.events
        },
        cbusErrors() {
            return this.$store.state.cbusErrors
        },
        layoutDetails() {
            return this.$store.state.layout
        }
    },
    template: `
        <div>
            <v-tabs>
                <v-tab :key="1">
                    Nodes
                </v-tab>
                <v-tab :key="2">
                    Events
                </v-tab>
                <v-tab :key="3">
                    Cbus Errors
                </v-tab>
                <v-tab :key="4">
                    DCC Errors
                </v-tab>
                <v-tab :key="5">
                    Layout
                </v-tab>
                <v-tab-item :key="1">
                    <v-card flat>
                        <v-card-text>{{ nodes }}</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="2">
                    <v-card flat>
                        <v-card-text>{{ events }}</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="3">
                    <v-card flat>
                        <v-card-text>{{ cbusErrors }}</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="4">
                    <v-card flat>
                        <v-card-text> todo </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="5">
                    <v-card flat>
                        <v-card-text>{{ layoutDetails }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>

    `
})