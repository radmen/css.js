###
  css.js - Dynamic stylesheets 

  https://github.com/radmen/css.js
  Copyright (c) 2012 Radoslaw Mejer <radmen@gmail.com>
###

extend = (extendedVar, object) ->
  for own key, value of object
    extendedVar[key] = value

  return

is_object = (object) -> '[object Object]' is Object.prototype.toString.call object

class Selector

  constructor: (@name, @sheet) ->
    @props = {}
    @node = document.createTextNode('')

  getName: -> @name

  properties: (properties) ->
    extend(@props, properties)
    @refresh()

    this

  refresh: ->
    parts = []

    for own name, value of @props
      parts.push("#{name}:#{value}")

    @node.nodeValue = "#{@name} { #{parts.join ';'}; }"
    
    return

  getNode: -> @node

  selector: (name, properties) -> @sheet.selector(name, properties)

  remove: -> @sheet.remove(@)

class Sheet

  constructor: ->
    @node = document.createElement('style')
    @node.type = 'text/css'
    @selectors = {}

    document.head.appendChild(@node)

  selector: (name, properties) ->

    if not @selectors[name]
      selector = @selectors[name] = new Selector(name, @)
      @node.appendChild(selector.getNode())
    else
      selector = @selectors[name]

    if properties
      selector.properties(properties)

      return @

    return selector

  remove: (selector) ->

    if not selector
      @node.parentNode.removeChild(@node)
      delete @properties

      return null

    if typeof selector is 'string' and @selector[selector]
      @node.removeChild(@selectors[selector].getNode())
      delete @selectors[selector]

    if is_object selector
      @node.removeChild(selector.getNode())
      delete @selectors[selector.getName()]

    return @

@cssjs = 
  newSheet: -> new Sheet()