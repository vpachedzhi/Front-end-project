/**
 * Created by Filipoff on 1.2.2017 г..
 */
define(['ractive', 'text!components/Album/album.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                //components.push(this);
                $.ajax({
                    url: this.get("url"),
                    data: window.auth,
                    success: function (response) {
                        this.set("album", this.processResponse(response));
                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                })
            },

            getAlbumArt: function (response) {
                console.log(response);
                return response.images ? response.images[0].resource_url : "resources/default-release.png";
            },

            getTotalDuration: function (response) {

                var tracklist = response.tracklist;

                var totalSeconds = tracklist.reduce(function (acc, track) {
                    return acc + this.convertToSeconds(track.duration);
                }.bind(this), 0);


                if (isNaN(totalSeconds)) {
                    return "";
                }
                return this.convertToMinutes(totalSeconds);
            },

            convertToSeconds: function (duration) {
                var minutesAndSeconds = duration.split(":");
                return (parseInt(minutesAndSeconds[0]) * 60) + parseInt(minutesAndSeconds[1]);
            },
            convertToMinutes: function (totalSeconds) {
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds - minutes * 60;
                return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            },

            processResponse: function (response) {
                response.totalDuration = this.getTotalDuration(response);
                response.albumArtURL = this.getAlbumArt(response);

                if (response.artists[0].name === "Various")
                    response.isVarious = true;

                return response;
            },

            selectArtist: function (resource_url) {
                eventEmitter.fire("ARTIST_SELECTED_EVENT", resource_url);
            },

            selectYear: function (year) {
                eventEmitter.fire("SEARCH_QUERY_EVENT", {year: year});
            },

            selectGenre: function (genre) {
                eventEmitter.fire("SEARCH_QUERY_EVENT", {genre: genre});
            },

            selectStyle: function (style) {
                eventEmitter.fire("SEARCH_QUERY_EVENT", {style: style});
            }
        });
    });
/**
 * Created by Filipoff on 2.2.2017 г..
 */
