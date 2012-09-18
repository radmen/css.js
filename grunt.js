/*global module:false*/
module.exports = function(grunt) {
  var exec = require('child_process').exec,
      log = grunt.log;

  grunt.registerMultiTask('coffee', 'compiles CoffeeScript files.', function() {
    var done = this.async(),
        dir = this.data.dir,
        dest = this.data.dest;
    
    var cmd = 'coffee --compile --output ' + dest + ' ' + dir;
    
    exec(cmd, [], function(error, stdout, stderr) {
      if(error !== null) {
        log.writeln(dir + ': failed to compile to ' + dest);
        log.writeln(stderr);
        done(false);
      }else{
        log.writeln(dir + ': compiled to ' + dest);
        done(true);
      }
    });
  });

  grunt.initConfig({
    
    pkg: '<json:package.json>',
    
    coffee: {
      
      dist: {
        dir: 'src/',
        dest: '.'
      }
    },
    
    min: {
      
      dist: {
        src: ['css.js'],
        dest: 'css.min.js'
      }
    }
  })
  
  grunt.registerTask('default', 'coffee min');
};
