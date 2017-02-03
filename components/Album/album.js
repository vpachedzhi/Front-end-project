/**
 * Created by Filipoff on 1.2.2017 г..
 */
define(['ractive', 'text!components/Album/album.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                //            components.push(this);
                $.ajax({
                    url: this.get("url"),
                    data: window.auth,
                    success: function (response) {
                        this.set("album", response);
                        console.log(this.get());
                        this.setAlbumArt();
                        this.setTotalDuration();
                        this.setGenreAndStyle();
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                })
            },

            setGenreAndStyle: function () {
                this.set("genre", this.get("album.genres").join(", "));
                this.set("style", this.get("album.styles").join(", "));
            },

            setAlbumArt: function () {

                var albumArtURL = this.get("album.images").find(function (image) {
                    return image.type === "primary";
                });
                // TODO: return default no art image
                this.set("albumArt", albumArtURL ? albumArtURL.resource_url : undefined);
            },

            setTotalDuration: function () {

                var tracklist = this.get("album.tracklist");

                var totalSeconds = 0;

                for (var i = 0; i < tracklist.length; i++) {
                    totalSeconds += this.convertToSeconds(tracklist[i].duration);
                }

                // tracklist.forEach(function (element) {
                //     totalSeconds += this.convertToSeconds(element.duration);
                // });

                if (isNaN(totalSeconds)){
                    this.set("totalDuration", "");
                    return;
                }
                this.set("totalDuration", this.convertToMinutes(totalSeconds));
            },

            convertToSeconds: function (duration) {
                var minutesAndSeconds = duration.split(":");
                return (parseInt(minutesAndSeconds[0]) * 60) + parseInt(minutesAndSeconds[1]);
            },
            convertToMinutes: function (totalSeconds) {
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds - minutes * 60;
                return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            }

        });

    });
/**
 * Created by Filipoff on 2.2.2017 г..
 */
