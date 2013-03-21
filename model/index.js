/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('model.' + ext, path.join('app/scripts/models', this.name + '-model.' + ext));
};
