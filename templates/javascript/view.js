define(['<%= _.classify(appname) %>'], function(<%= _.classify(appname) %>){
  var  <%= _.classify(name) %>View = {
    template: <%= _.underscored(name) %>
  };

  return  <%= _.classify(name) %>View;
};
