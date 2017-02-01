define(['ractive', 'text!components/demoComponent/template.html', 'lodash'],function (Ractive, template, _) {

    return Ractive.extend({
        template: template,

        data: function () {
            return {
                clicks: 0,
                username: '',
                password: '',
                users: [
                    {
                        name: 'Vasko',
                        pass: 1234
                    },
                    {
                        name: 'Marto',
                        pass: 5678
                    },
                    {
                        name: 'Kondio',
                        pass: 5678
                    }
                ],
                html: '<h2>Vasko</h2>',
                naVekeObj: {
                    nula: 0,
                    edno: 1,
                    dve: 2
                }
            }
        },

        oninit: function () {
            this.observe('users.*.pass', function ( newValue, oldValue, keypath ) {
                console.log( oldValue + ' changed to ' + newValue , keypath);
            });
            this.observe('username', function ( newValue, oldValue, keypath ) {
                console.log( oldValue + ' changed to ' + newValue , keypath);
            })
        },

        onrender: function () {
            console.log(_.groupBy(this.get('users'), 'pass'))
        },

        computed: {
            squareClicks: function () {
                var clicks = this.get('clicks');
                return clicks * clicks;
            },
            demoArr: function () {
                return this.get('users').map(function (user) {
                    return user.pass
                })
            }
        },


        handleClick: function () {
            this.set({
                clicks: this.get('clicks')+1
            });
        },

        handle: function (user, i) {
            if(!(user.pass % 2)) {
                this.set('users.'+i+'.name', user.name.toUpperCase())
            }
        },

        returnHtml: function () {
            return '<div><h1>Alabala</h1></div>';
        }
    });

});
