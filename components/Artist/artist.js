define(['ractive', 'text!components/Artist/artist.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                $.ajax({
                    url: this.get("url"),
                    data: window.auth,
                    success: function (response) {
                        response.description = this.formatDescription(response.profile);
                        this.processResponse(response);
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                })
            },

            processResponse: function (response) {

                $.ajax({
                    url: response.releases_url,
                    data: window.auth,
                    success: function (resp) {

                        response.releases = resp.releases.filter(function (release) {
                            return release.type === "master";
                        });
                        this.set({
                            artist: response,
                            showMoreInfo: false
                        });

                        var context = this;
                        // TODO is this the right way ?
                        $(".clickable-table-row").click(function() {
                            context.selectAlbum($(this).data("href"));
                        });

                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });
            },

            formatDescription: function (description) {

                var re = /\[\w=(.*?)\]/g;

                return description.replace(re, "$1");
            },

            selectAlbum: function (resource_url) {
                eventEmitter.fire("ALBUM_SELECTED_EVENT", resource_url);
            },

            selectArtist: function (resource_url) {
                console.log(resource_url);
                eventEmitter.fire("ARTIST_SELECTED_EVENT", resource_url);
            }
        });
    });
/**

 * Created by Filipoff on 6.2.2017 г..
 */
