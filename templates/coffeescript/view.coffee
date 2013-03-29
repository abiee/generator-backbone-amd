define ['<%= _.slugify(appname) %>'], (<%= _.classify(appname) %>) ->
  class <%= _.classify(name) %>View extends Backbone.View
    template: <%= _.underscored(name) %>

  <%= _.classify(appname) %>.Views.<%= _.classify(name) %>View = <%= _.classify(name) %>View
  return <%= _.classify(name) %>View
