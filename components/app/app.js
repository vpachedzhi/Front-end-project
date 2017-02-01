define(['ractive', 'text!components/app/template.html', 'jquery'],
    function (Ractive, template, $) {

    return Ractive.extend({
        template: template,

        data: function () {
            return {}
        },

        oninit: function () {
            components.push(this)
            console.log('App oninit')
            $.ajax({
                url: "https://api.discogs.com/artists/270222",
                success: function (res){
                    console.log('Service success')
                    this.set('res', res)
                }.bind(this),
                error: function (err) {
                    console.log(err)
                }
            })
        },

        handleClick: function () {

        }
    });

});
