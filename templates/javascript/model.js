define(['<%= _.classify(appname) %>'], function(<%= _.classify(appname) %>){
  var <%= _.classify(name) %>Model = Backbone.Model.extend({

  });

  <%= _.classify(appname) %>.Models.<%= _.classify(name) %>Model = <%= _.classify(name) %>Model;
  return <%= _.classify(name) %>Model;
});
