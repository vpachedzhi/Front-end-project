requirejs.config({
    paths: {
        'ractive': 'lib/ractive/ractive',
        'ractive-events-keys': 'lib/ractive/ractive-events-keys',
        'lodash': 'lib/lodash/lodash',
        'jquery': 'lib/jquery/jquery-1.11.3.min',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'rvc': 'rvc',
        // Components
        'album': "components/Album/album"
    },
    shim: {
        'bootstrap': ['jquery'],
        'key': ['ractive'],
    }
});

requirejs([
    'ractive',
    'bootstrap',
        'text!mainTemplate.html',
    'album'
    ],

    function (Ractive, bootstrap, template, album) {
        "use strict";
        window.components = [];

        window.auth = {
            key : "zIjBTnMjbclkbdcdBPuK",
            secret : "FtHTmcRQrycLEZhqgNuXgfMHdAkaJnTQ"
        };

        var ractive = new Ractive({
            el: 'body',
            template: template,

            components: {
                Album: album
            },

            data: function() {
                return {
                    albums: [],
                    mainShown: true,
                    albumURL: "",
                };
            },
            oninit: function () {
                $.ajax({
                    url: "https://api.discogs.com/artists/18839/releases",
                    data: auth,
                    success: function (response){
                        this.set('albums', response.releases)
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                })
            },

            chooseAlbum: function(resource_url) {
                this.set({
                    albumURL: resource_url,
                    mainShown: false
                })
            }
        });
        components.push(ractive);
})