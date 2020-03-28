Vue.component('mergDefault', {
    name: "mergDefault",
    props: ['node'],
    data: function () {
        return {
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
    template: `<v-container>
    <v-tabs fixed-tabs color="white" left slider-color="blue">
        <v-tab :key="1">Info</v-tab>
        <v-tab :key="2">Settings</v-tab>
        <v-tab :key="3">Events</v-tab>
        <v-tab-item :key="1">Info</v-tab-item>
        <v-tab-item :key="2">Settings</v-tab-item>
        <v-tab-item :key="3">Events</v-tab-item>
    </v-tabs>
    <h2>Default Node Page</h2>
    <p>{{ JSON.stringify(node) }}</p>
</v-container>
                   `
})