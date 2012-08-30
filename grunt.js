/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: '<json:package.json>',
    
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name + " - " + pkg.description %> \n' +
        ' *\n' + 
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */'
    },
    
    concat: {
      
      dist: {
        src: ['<banner>', 'src/css.js'],
        dest: 'css.js'
      }
    },
    
    min: {
      
      dist: {
        src: ['src/css.js'],
        dest: 'css.min.js'
      }
    }
  })
  
  grunt.registerTask('default', 'concat min');
};
