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

                        // response.releases = resp.releases.filter(function (release) {
                        //     return release.type === "master";
                        // });

                        response.releases = resp.releases;
                        console.log(response);

                        var albumsPerPage = this.get("albumsPerPage");
                        var numberOfPages = response.releases.length % albumsPerPage == 0 ?
                            Math.floor(response.releases.length / albumsPerPage) : Math.ceil(response.releases.length / albumsPerPage);


                        this.set({
                            artist: response,
                            showMoreInfo: false,
                            numberOfPages: numberOfPages,
                            currentPage: 1
                        });
                        this.displayAlbumPage(1);
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

                $.ajax({
                    url: resource_url,
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

                // TODO : 10 must be global constant

                if (pageNumber > this.get("numberOfPages") || pageNumber < 1)
                    return;


                var albumsPerPage = this.get("albumsPerPage");
                var releases = this.get("artist.releases").slice((pageNumber * albumsPerPage) - albumsPerPage, pageNumber * albumsPerPage);

                this.set({
                    currentAlbumsDisplayed: releases,
                    currentPage: pageNumber
                });

                console.log(this.get());
            }
        });
    });
/**

 * Created by Filipoff on 6.2.2017 г..
 */
