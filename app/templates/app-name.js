define(['backbone'], function () {
    <%= _.classify(appname) %> = {
        init: function () {
            // initialize router, views, data and layouts
        },
        start: function () {
            <%= _.classify(appname) %>.init();
            Backbone.history.start();
        }
    }

    return <%= _.classify(appname) %>;
});
