var cssjs = (function() {
  var each = function(object, callback) {
    var key;
    
    for(key in object) {
      object.hasOwnProperty(key) && callback(object[key], key);
    }
  }
  
  var extend = function(extendedVar, object) {
    each(object, function(value, key) {
      extendedVar[key] = value;
    })
  }
  
  var is_object = function(object) {
    return '[object Object]' === Object.prototype.toString.call(object)
  }
  
  var Selector = function(name, sheet) {
    this.name = name;
    this.sheet = sheet;
    this.props = {};
    this.node = document.createTextNode('');
  }
  
  Selector.prototype = {
    
    /**
     * @returns {string}
     */
    getName: function() {
      return this.name;
    },
    
    /**
     * @returns {Selector}
     */ 
    properties: function(properties) {
      extend(this.props, properties);
      this.refresh();
      
      return this;
    },
      
    /**
     * Updates DOM node style definition
     */
    refresh: function() {
      var parts = [],
          css;

      each(this.props, function(value, name) {
        parts.push(name + ':' + value);
      });

      css = this.name + '{' + parts.join(';') + ';}';
      this.node.nodeValue = css;
    },

    /**
     * @returns {DomElement}
     */
    getNode: function() {
      return this.node;
    },
    
    /**
     * Gets other selector from the sheet
     * 
     * @see Sheet::selector()
     * @returns {Selector}
     */
    selector: function(name, properties) {
      return this.sheet.selector(name, properties);
    },
    
    remove: function() {
      return this.sheet.remove(this);
    }
  }

  var Sheet = function() {
    this.node = document.createElement('style');
    this.node.type = 'text/css';
    
    this.selectors = {};
    
    document.head.appendChild(this.node);
  }
  
  Sheet.prototype = {
    
    /**
     * @param {String} name
     * @param {Object} [properties] selector properties
     * @returns Sheet|Selector depends on properties argument - if passed Sheet instance will be returned
     */
    selector: function(name, properties) {
      var selector;

      if(!this.selectors[name]) {
        selector = this.selectors[name] = new Selector(name, this);
        this.node.appendChild(selector.getNode());
      }
      else {
        selector = this.selectors[name];
      }

      if(properties) {
        selector.properties(properties);

        return this;
      }

      return selector;
    },
    
    /**
     * Removes sheet.
     * 
     * If selector given it will be removed instead of Sheet
     * 
     * @param {String|Selector} [selector
     * @returns {Sheet|null} NULL when sheet is removed
     */
    remove: function(selector) {
      
      if(!selector) {
        this.node.parentNode.removeChild(this.node);
        delete this.properties;
        
        return null;
      }
      
      if('string' === typeof selector && this.selectors[selector]) {
        this.node.removeChild(this.selectors[selector].getNode());
        delete this.selectors[selector];
      }
      
      if(is_object(selector)) {
        this.node.removeChild(selector.getNode());
        delete this.selectors[selector.getName()];
      }
      
      return this;
    }
  }

  return {

    /**
     * Creates new CSS Sheet
     * 
     * @returns {Sheet}
     */
    newSheet: function() {
      return new Sheet();
    }
  }
})();