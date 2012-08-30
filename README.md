css.js
======

JavaScript dynamic stylesheets

usage
=====

Basic usage.

```javascript
var sheet = cssjs.newSheet();
sheet
  .selector('div.test', {
    'float': 'left',
    'border': '1px solid #000'
  })
  .selector('span', {
    'font-style': 'italic'
  });
```      
  
Selectors can be used later.

```javascript
var div_css = sheet.selector('div.test');

div_css.properties({
  'background': 'pink'
});
```
    
Remove selector properties.
  
```javascript
sheet.remove('div.test');
sheet.remove(div_css);
```
    
Remove sheet.
  
```javascript
sheet.remove();
```

todo
====

* compatibility check
* unit testing
* ...?