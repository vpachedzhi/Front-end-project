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
                    searchURL: "",
                    filtersApplied: [],
                    selectedGenre: '',
                    genres: ['Rock', 'Hip Hop', 'Reggae', 'Funk / Soul', 'Electronic', 'Classical', 'Latin', 'Stage & Screen', 'Blues', 'Non-Music', "Children's", 'Brass & Military'],
                    selectedStyle: '',
                    styles: ['Aboriginal','Abstract','Acid','Acid House','Acid Jazz','Acid Rock','Acoustic','African','Afro-Cuban','Afro-Cuban Jazz','Afrobeat','Alternative Rock','Ambient','Andalusian Classical','AOR','Arena Rock','Art Rock','Audiobook','Avant-garde Jazz','Avantgarde','Axé','Azonto','Bachata','Ballad','Ballroom','Baltimore Club','Bangladeshi Classical','Baroque','Bass Music','Bassline','Batucada','Bayou Funk','Beat','Beatbox','Beatdown','Beguine','Berlin-School','Bhangra','Big Band','Big Beat','Black Metal','Bluegrass','Blues Rock','Bolero','Bollywood','Bongo Flava','Boogaloo','Boogie','Boogie Woogie','Boom Bap','Bop','Bossa Nova','Bossanova','Bounce','Brass Band','Breakbeat','Breakcore','Breaks','Brit Pop','Britcore','Broken Beat','Bubblegum','Bubbling','Cajun','Calypso','Cambodian Classical','Canzone Napoletana','Cape Jazz','Carnatic','Catalan Music','Celtic','Cha-Cha','Chamamé','Chanson','Charanga','Chicago Blues','Chillwave','Chinese Classical','Chiptune','Classic Rock','Classical','Cloud Rap','Coldwave','Comedy','Compas','Conjunto','Conscious','Contemporary','Contemporary Jazz','Contemporary R&B','Cool Jazz','Copla','Corrido','Country','Country Blues','Country Rock','Crunk','Crust','Cuatro','Cubano','Cumbia','Cut-up/DJ','Dance-pop','Dancehall','Danzon','Dark Ambient','Darkwave','Death Metal','Deathcore','Deathrock','Deep House','Deep Techno','Delta Blues','Descarga','Dialogue','Disco','Disco Polo','Dixieland','DJ Battle Tool','Donk','Doo Wop','Doom Metal','Doomcore','Downtempo','Drone','Drum n Bass','Dub','Dub Poetry','Dub Techno','Dubstep','Dungeon Synth','Early','East Coast Blues','Easy Listening','EBM','Education','Educational','Electric Blues','Electro','Electro House','Electroclash','Emo','Enka','Ethereal','Euro House','Euro-Disco','Eurobeat','Eurodance','Europop','Experimental','Fado','Favela Funk','Field Recording','Flamenco','Folk','Folk Metal','Folk Rock','Forro','Forró','Free Funk','Free Improvisation','Free Jazz','Freestyle','Funk','Funk Metal','Funkot','Fusion','Future Jazz','G-Funk','Gabber','Gagaku','Gamelan','Gangsta','Garage House','Garage Rock','Ghetto','Ghetto House','Ghettotech','Glam','Glitch','Go-Go','Goa Trance','Gogo','Gospel','Goth Rock','Gothic Metal','Grime','Grindcore','Griot','Grunge','Guaguancó','Guajira','Guaracha','Guarania','Gypsy Jazz','Hands Up','Happy Hardcore','Hard Beat','Hard Bop','Hard House','Hard Rock','Hard Techno','Hard Trance','Hardcore','Hardcore Hip-Hop','Hardstyle','Harmonica Blues','Harsh Noise Wall','Heavy Metal','Hi NRG','Highlife','Hillbilly','Hindustani','Hip Hop','Hip-House','Hiplife','Honky Tonk','Horrorcore','House','Hyphy','IDM','Illbient','Impressionist','Indian Classical','Indie Pop','Indie Rock','Industrial','Instrumental','Interview','Italo House','Italo-Disco','Italodance','J-Core','J-pop','Jazz-Funk','Jazz-Rock','Jazzdance','Jazzy Hip-Hop','Jibaro','Joropo','Juke','Jump Blues','Jumpstyle','Jungle','Junkanoo','Karaoke','Kaseko','Kayōkyoku','Keroncong','Klasik','Klezmer','Korean Court Music','Krautrock','Kwaito','Lambada','Lao Music','Latin','Latin Jazz','Laïkó','Leftfield','Light Music','Lo-Fi','Louisiana Blues','Lounge','Lovers Rock','Luk Krung','Luk Thung','Makina','Mambo','Marches','Mariachi','Marimba','Math Rock','Mbalax','Medieval','Melodic Death Metal','Melodic Hardcore','Memphis Blues','Mento','Merengue','Metalcore','Miami Bass','Military','Minimal','Minimal Techno','Minneapolis Sound','Mizrahi','Mod','Modal','Modern','Modern Classical','Modern Electric Blues','Monolog','Motswako','Mouth Music','Movie Effects','MPB','Mugham','Music Hall','Musical','Musique Concrète','Neo Soul','Neo Trance','Neo-Classical','Neo-Romantic','Neofolk','New Age','New Beat','New Jack Swing','New Wave','Nitzhonot','No Wave','Noise','Nordic','Norteño','Novelty','Nu Metal','Nu-Disco','Nueva Cancion','Nueva Trova','Nursery Rhymes','Népzene','Oi','Opera','Operetta','Ottoman Classical','Overtone Singing','P.Funk','Pachanga','Pacific','Parody','Persian Classical','Philippine Classical','Phleng Phuea Chiwit','Piano Blues','Piedmont Blues','Piobaireachd','Pipe & Drum','Plena','Poetry','Political','Polka','Pop Punk','Pop Rap','Pop Rock','Porro','Post Bop','Post Rock','Post-Hardcore','Post-Modern','Post-Punk','Power Electronics','Power Metal','Power Pop','Prog Rock','Progressive Breaks','Progressive House','Progressive Metal','Progressive Trance','Promotional','Psy-Trance','Psychedelic','Psychedelic Rock','Psychobilly','Pub Rock','Public Broadcast','Public Service Announcement','Punk','Quechua','Radioplay','Ragga','Ragga HipHop','Ragtime','Ranchera','Rapso','Raï','Rebetiko','Reggae','Reggae Gospel','Reggae-Pop','Reggaeton','Religious','Renaissance','Rhythm & Blues','Rhythmic Noise','RnB/Swing','Rock & Roll','Rockabilly','Rocksteady','Romani','Romantic','Roots Reggae','Rumba','Rune Singing','Salsa','Samba','Schlager','Schranz','Score','Screw','Sea Shanties','Sephardic','Serial','Sermon','Shoegaze','Shoegazer','Ska','Skiffle','Skweee','Sludge Metal','Smooth Jazz','Soca','Soft Rock','Son','Son Montuno','Sonero','Soukous','Soul','Soul-Jazz','Sound Art','Sound Collage','Sound Poetry','Soundtrack','Southern Rock','Space Rock','Space-Age','Spaza','Special Effects','Speech','Speed Garage','Speed Metal','Speedcore','Spoken Word','Steel Band','Stoner Rock','Story','Surf','Swamp Pop','Swing','Swingbeat','Symphonic Rock','Synth-pop','Synthwave','Sámi Music','Séga','Tango','Tech House','Tech Trance','Technical','Techno','Tejano','Texas Blues','Thai Classical','Theme','Therapy','Thrash','Thug Rap','Timba','Trance','Trap','Tribal','Tribal House','Trip Hop','Tropical House','Trova','Turntablism','Twelve-tone','UK Garage','Vallenato','Vaporwave','Viking Metal','Vocal','Volksmusik','Western Swing','Witch House','Zouk','Zydeco','Éntekhno'],
                    selectedCountry: '',
                    countries: ['US','UK','Germany','France','Japan','Canada','Russia','Italy','Australia','Europe','Spain','Netherlands','Sweden','Poland','Belgium','Greece','Finland','Austria','UK & Europe','Norway','Switzerland','Ukraine','Brazil','Czech Republic','New Zealand','Portugal','Croatia','Serbia','Iceland','Argentina','Hungary','Denmark','USA & Canada','Mexico','China','Yugoslavia','Slovenia','Philippines','Israel','Australasia','UK, Europe & US','Scandinavia','Taiwan','Estonia','Germany, Austria, & Switzerland','Lithuania','Ireland','UK & Ireland','Chile','Peru','South Africa','UK & US','South Korea','Benelux','German Democratic Republic (GDR)','Indonesia','Slovakia','Turkey','USA, Canada & UK','Malaysia','Venezuela','Bulgaria','Colombia','Belarus','Romania','Singapore','Thailand','USA & Europe','Luxembourg','Bosnia & Herzegovina','Hong Kong','India','Latvia','Macedonia','USA, Canada & Europe','Asia','Australia & New Zealand','Ecuador','France & Benelux','Germany & Switzerland','UK, Europe & Japan','Bolivia','Czech Republic & Slovakia','Czechoslovakia','Guatemala','Puerto Rico','Saudi Arabia','Serbia and Montenegro','Singapore, Malaysia & Hong Kong','South East Asia','UK & France','United Arab Emirates','Uruguay']
                };
            },
            oninit: function () {
                $.ajax({
                    url: "https://api.discogs.com/database/search",
                    data: Object.assign({}, auth, {
                        type: "master"
                    }),
                    success: function (response) {
                        console.log(response);
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
            },

            selectGenre: function (genre) {
                var filters = this.get('filtersApplied');
                filters = filters.filter(function(f){return f !== this.get('selectedGenre');}.bind(this));
                filters.push(genre);
                this.set({selectedGenre:genre, filtersApplied: filters})
                this.updateAlbums();
            },

            selectStyle: function (style) {
                var filters = this.get('filtersApplied');
                filters = filters.filter(function(f){return f !== this.get('selectedStyle');}.bind(this));
                filters.push(style);
                this.set({selectedStyle:style, filtersApplied: filters})
                console.log(this.get('filtersApplied'));
                this.updateAlbums();
            },

            selectCountry: function (country) {
                var filters = this.get('filtersApplied');
                filters = filters.filter(function(f){return f !== this.get('selectedCountry');}.bind(this));
                filters.push(country);
                this.set({selectedCountry:country, filtersApplied: filters})
                this.updateAlbums();
            },

            updateAlbums: function () {
                var params = {};
                if(this.get('filtersApplied')) {
                    if(this.get('selectedGenre')) {
                        params.genre = this.correctParam(this.get('selectedGenre'));
                    }
                    if(this.get('selectedStyle')) {
                        params.style = this.correctParam(this.get('selectedStyle'));
                    }
                    if(this.get('selectedCountry')) {
                        params.country = this.correctParam(this.get('selectedCountry'));
                    }
                }

                console.log(params);

                $.ajax({
                    url: "https://api.discogs.com/database/search",
                    data: Object.assign({}, auth, params),
                    success: function (response) {
                        this.set('albums', response.results);
                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });
            },

            correctParam: function(param) {
                param = param.replace(' ', '+');
                param = param.replace(',', '%2C');
                param = param.replace('&', '%26');
                param = param.replace('/', '%2F');
                param = param.replace("'", '%27');
                param = param.replace('(', '%28');
                param = param.replace(')', '%29');
                return param;
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
// must also process normal releases