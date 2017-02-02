/**
 * Created by Filipoff on 1.2.2017 г..
 */
define(['ractive', 'text!components/Album/album.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                console.log(this.get());
    //            components.push(this);

                $.ajax({
                    url: this.get("url"),
                    data: window.auth,
                    success: function (response){
                        console.log(response);
                        this.set("album", response);
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                })
            }
        });

    });
/**
 * Created by Filipoff on 2.2.2017 г..
 */
