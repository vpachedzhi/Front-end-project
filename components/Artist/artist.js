define(['ractive', 'text!components/Artist/artist.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                $.ajax({
                    url: this.get("url"),
                    data: window.auth,
                    success: function (response) {
                        console.log(response);
                        this.processResponse(response);
                        console.log(response);

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

                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });
            }
        });
    });
/**

 * Created by Filipoff on 6.2.2017 г..
 */
