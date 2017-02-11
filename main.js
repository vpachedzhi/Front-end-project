requirejs.config({
    paths: {
        'ractive': 'lib/ractive/ractive',
        'ractive-events-keys': 'lib/ractive/ractive-events-keys',
        'lodash': 'lib/lodash/lodash',
        'jquery': 'lib/jquery/jquery-1.11.3.min',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'rvc': 'rvc',
        // Components
        'album': "components/Album/album",
        'artist': "components/Artist/artist",
        'search': "components/Search/search"
    },
    shim: {
        'bootstrap': ['jquery'],
        'key': ['ractive'],
    }
});

requirejs([
        'ractive',
        'bootstrap',
        'jquery',
        'text!mainTemplate.html',
        'album',
        'artist',
        'search'
    ],

    function (Ractive, bootstrap, $, template, album, artist, search) {
        "use strict";

        window.Ractive = Ractive;
        Ractive.components = {
            Album: album,
            Artist: artist,
            Search: search
        };

        window.auth = {
            key: "zIjBTnMjbclkbdcdBPuK",
            secret: "FtHTmcRQrycLEZhqgNuXgfMHdAkaJnTQ"
        };

        window.eventEmitter = new Ractive();

        new Ractive({
            el: 'body',
            template: template,


            data: function () {
                return {
                    albums: [],
                    mainShown: true,
                    albumShown: false,
                    artistShown: false,
                    searchShown: false,
                    artistURL: "",
                    albumURL: "",
                    searchURL: ""
                };
            },
            oninit: function () {
                $.ajax({
                    url: "https://api.discogs.com/database/search",
                    data: Object.assign({}, auth, {
                        type: "master"
                    }),
                    success: function (response) {
                        this.set('albums', response.results);
                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });

                eventEmitter.on("ARTIST_SELECTED_EVENT", function (resource_url) {

                    this.set({
                        artistURL: resource_url,
                        mainShown: false,
                        albumShown: false,
                        artistShown: true,
                        searchShown: false

                    });
                }.bind(this));

                eventEmitter.on("ALBUM_SELECTED_EVENT", function (resource_url) {

                    this.set({
                        albumURL: resource_url,
                        mainShown: false,
                        artistShown: false,
                        searchShown: false,
                        albumShown: true
                    });
                }.bind(this));

                eventEmitter.on("SEARCH_QUERY_EVENT", function (params) {

                    params.type = "master";

                    this.set({
                        searchURL: "https://api.discogs.com/database/search",
                        mainShown: false,
                        albumShown: false,
                        artistShown: false,
                        searchShown: true,
                        searchParameters: params
                    });
                }.bind(this));

            },

            selectAlbum: function (resource_url) {
                eventEmitter.fire("ALBUM_SELECTED_EVENT", resource_url);
            }
        });
    });


// TODO : Use strict what is embedded style
// NO embedded
// Fix album table to bootstrap
// add more css3 props
// artist profile info parse maybe with regex
// handle VARIOUS artist
// artist already selected, when selecting

