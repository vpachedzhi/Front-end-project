requirejs.config({
    paths: {
        'ractive': 'lib/ractive/ractive',
        'ractive-events-keys': 'lib/ractive/ractive-events-keys',
        'lodash': 'lib/lodash/lodash',
        'jquery': 'lib/jquery/jquery-1.11.3.min',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'rvc': 'rvc',
        // Components
        'app': 'components/app/app',
        'demo': 'components/demoComponent/demoComponent'
    },
    shim: {
        'bootstrap': ['jquery'],
        'key': ['ractive'],
    }
});

requirejs([
    'ractive',
    'bootstrap',
    'app',
    'demo'
    ],

    function (Ractive, bootstrap, App, demo) {

        window.components = []

        var ractive = new App({
            el: 'body',
            template: '<App/>',

            oninit: function () {

            },

            components: {
                App: App
                //demoComponent: demo
            }
        });
        components.push(ractive)
})