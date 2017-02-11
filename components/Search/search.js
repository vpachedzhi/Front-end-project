/**
 * Created by Filipoff on 11.2.2017 г..
 */
define(['ractive', 'text!components/Search/search.html', 'jquery'],
    function (Ractive, template, $) {

        return Ractive.extend({
            template: template,

            oninit: function () {
                $.ajax({
                    url: this.get("url"),
                    data: Object.assign({}, auth, this.get("params")),
                    success: function (response) {
                        this.set("search", response);
                        console.log(this.get());
                    }.bind(this),
                    error: function (err) {
                        console.log(err)
                    }
                });
            }
        });
    });
