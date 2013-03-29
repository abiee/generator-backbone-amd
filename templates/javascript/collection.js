define(['<%= _.slugify(appname) %>', <% if (!_.isEmpty(model)) { %>, 'models/<%= model %>'<% } %>], function(<%= _.classify(appname) %>){
  var <%= _.classify(name) %>Collection = Backbone.Collection.extend({<% if (!_.isEmpty(model)) { %>
    model: <%= _.classify(appname) %>.Models.<%= _.classify(model) %>Model<% } %>
  });

  <%= _.classify(appname) %>.Collections.<%= _.classify(name) %>Collection = <%= _.classify(name) %>Collection;
  return <%= _.classify(name) %>Collection;
});
