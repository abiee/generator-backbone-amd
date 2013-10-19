/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }<% if (bootstrapFlavor !== 'none') { %>,
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: {
            exports: 'Handlebars'
        }<% } %>
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'<% if (bootstrapFlavor !== 'none') { %>,
        bootstrap: 'vendor/bootstrap'<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: '../bower_components/handlebars/handlebars'<% } %>
    }
});

require([
    'backbone'
], function (Backbone) {
    Backbone.history.start();
    console.log('Hello from Backbone!');
});
