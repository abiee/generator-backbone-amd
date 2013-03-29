define(['<%= _.slugify(appname) %>'], function(<%= _.classify(appname) %>){
  var <%= _.classify(name) %>View = Backbone.View.extend({
    template: <%= _.underscored(name) %>
  });

  <%= _.classify(appname) %>.Views.<%= _.classify(name) %>View = <%= _.classify(name) %>View;
  return <%= _.classify(name) %>View;
});
