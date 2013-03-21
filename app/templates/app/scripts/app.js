define(['backbone'], function () {
    <%= projectname %> = {
        init: function () {
            // initialize router, views, data and layouts
        },
        start: function () {
            <%= projectname %>.init();
            Backbone.history.start();
        }
    }

    return <%= projectname %>;
});
