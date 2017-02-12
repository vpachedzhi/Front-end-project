/**
 * Created by Filipoff on 11.2.2017 г..
 */
define(['ractive', 'text!components/SearchResults/search.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                $.ajax({
                    url: this.get("url"),
                    data: Object.assign({}, auth, this.get("params")),
                    success: function (response) {
                        this.set({
                            "results": response.results,
                            "pagination": response.pagination
                        });
                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });
            },

            change: function () {
                console.log(this.get())
            },

            update: function () {
                console.log(this.get())
            },

            selectAlbum: function (resource_url) {
                eventEmitter.fire("ALBUM_SELECTED_EVENT", resource_url);
            }
        });
    });
