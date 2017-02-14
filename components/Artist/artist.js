define(['ractive', 'text!components/Artist/artist.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            data: function () {
                return {albumsPerPage: 10};
            },

            oninit: function () {
                this.selectArtist(this.get("url"));

            },

            processResponse: function (response) {

                $.ajax({
                    url: response.releases_url,
                    data: auth,
                    success: function (resp) {

                        response.releases = resp.releases;

                        var albumsPerPage = this.get("albumsPerPage");
                        var numberOfPages = response.releases.length % albumsPerPage == 0 ?
                            Math.floor(response.releases.length / albumsPerPage) : Math.ceil(response.releases.length / albumsPerPage);


                        response.releases.forEach(function (release) {
                            if (!release.hasOwnProperty('year'))
                                release.year = 0;
                        });

                        this.set({
                            artist: response,
                            showMoreInfo: false,
                            numberOfPages: numberOfPages,
                            currentPage: 1
                        })
                            .then(function () {
                                if ($("#artist-description").height() < 140)
                                    $("#description-btn").hide();
                            });
                        this.displayAlbumPage(1);
                    }.bind(this),
                    error: function (ignore) {
                    }
                });
            },

            formatDescription: function (description) {

                var re = /\[\w=(.*?)\]/g;
                var re2 = /\[\w\](.*?)\[\/\w\]/g;

                description = description.replace(re, "$1");
                description = description.replace(re2, "$1");

                return description;
            },

            selectAlbum: function (resource_url) {
                eventEmitter.fire("ALBUM_SELECTED_EVENT", resource_url);
            },

            selectArtist: function (resource_url) {

                $.ajax({
                    url: resource_url,
                    data: window.auth,
                    success: function (response) {
                        response.description = this.formatDescription(response.profile);
                        this.processResponse(response);
                    }.bind(this),
                    error: function (ignore) {
                    }
                })
            },

            sortAlbums: function (order) {

                var compareFunctions = {

                    ascYear: function (first, second) {
                        if (first.year < second.year)
                            return -1;
                        if (first.year > second.year)
                            return 1;
                        return 0;
                    },
                    descYear: function (first, second) {
                        if (first.year > second.year)
                            return -1;
                        if (first.year < second.year)
                            return 1;
                        return 0;
                    },
                    ascTitle: function (first, second) {
                        if (first.title < second.title)
                            return -1;
                        if (first.title > second.title)
                            return 1;
                        return 0;
                    },
                    descTitle: function (first, second) {
                        if (first.title > second.title)
                            return -1;
                        if (first.title < second.title)
                            return 1;
                        return 0;
                    }
                };

                this.set("artist.releases", this.get("artist.releases").sort(compareFunctions[order]));

                this.displayAlbumPage(1);
            },

            displayAlbumPage: function (pageNumber) {

                if (pageNumber > this.get("numberOfPages") || pageNumber < 1)
                    return;


                var albumsPerPage = this.get("albumsPerPage");
                var releases = this.get("artist.releases").slice((pageNumber * albumsPerPage) - albumsPerPage, pageNumber * albumsPerPage);

                this.set({
                    currentAlbumsDisplayed: releases,
                    currentPage: pageNumber
                });
            }
        });
    });
/**

 * Created by Filipoff on 6.2.2017 г..
 */
