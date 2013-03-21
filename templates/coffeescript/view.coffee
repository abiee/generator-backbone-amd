define ['<%= _.classify(appname) %>'], (<%= _.classify(appname) %>) ->
  <%= _.classify(name) %>View =
    template: <%= _.underscored(name) %>

  return  <%= _.classify(name) %>View
