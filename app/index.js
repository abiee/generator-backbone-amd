'use strict'
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';
  this.option('coffee', { desc: 'CoffeeScript instead standard JavaScript' });

  // for hooks to resolve on mocha by default
  if (!this.options['test-framework']) {
    this.options['test-framework'] = 'mocha';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainJsFile = this.readFileAsString(path.join(this.sourceRoot(), 'main.' + ext));

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      skipMessage: options['skip-install-message']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function() {
  var cb = this.async();

  // welcome
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js and Modernizr.');

  var prompts = [{
    type: 'list',
    name: 'bootstrapFlavor',
    message: 'Would you like to include Bootstrap?',
    choices: [
      {'name':'yes, for Sass', value:'sass'},
      {'name':'yes, for Less', value:'less'},
      {'name':'no, without Bootstrap', value:'none'}
    ],
    default: 'sass'
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'RequireJS',
      value: 'includeRequireJS',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    }]
  }];

  // Show coffee script feature only if not was explictly selected on command line
  if (!this.options.coffee) {
    prompts[1].choices.push({
      name: 'Use CoffeeScript',
      value: 'coffee',
      checked: false
    });
  }

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.bootstrapFlavor = answers.bootstrapFlavor;
    this.includeRequireJS = hasFeature('includeRequireJS');
    this.includeModernizr = hasFeature('includeModernizr');
    this.coffee = !this.options.coffee ? hasFeature('coffee') : this.options.coffee;

    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.bootstrapFlavor === 'sass') {
    this.copy('main.scss', 'app/styles/main.scss');
  } else if (this.bootstrapFlavor === 'less') {
    this.copy('main.less', 'app/styles/main.less');
  } else {
    this.copy('main.css', 'app/styles/main.css');
  }
};

AppGenerator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js'
  ];

  if (this.templateFramework === 'handlebars') {
    vendorJS.push('bower_components/handlebars/handlebars.js');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

  if (this.coffee) {
    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/coffee.js',
      sourceFileList: ['scripts/hello.js'],
      searchPath: '.tmp'
    });
  }

  // wire Bootstrap plugins
  if (this.bootstrapFlavor !== 'none') {
    var dirName = this.bootstrapFlavor == 'sass' ? 'sass-bootstrap' : 'bootstrap'
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
      'bower_components/' + dirName + '/js/affix.js',
      'bower_components/' + dirName + '/js/alert.js',
      'bower_components/' + dirName + '/js/dropdown.js',
      'bower_components/' + dirName + '/js/tooltip.js',
      'bower_components/' + dirName + '/js/modal.js',
      'bower_components/' + dirName + '/js/transition.js',
      'bower_components/' + dirName + '/js/button.js',
      'bower_components/' + dirName + '/js/popover.js',
      'bower_components/' + dirName + '/js/carousel.js',
      'bower_components/' + dirName + '/js/scrollspy.js',
      'bower_components/' + dirName + '/js/collapse.js',
      'bower_components/' + dirName + '/js/tab.js'
    ]);
  }
};

AppGenerator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs() {
  if (!this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/requirejs/require.js'
  ], {'data-main': 'scripts/main'});
};

AppGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/vendor');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
};

AppGenerator.prototype.bootstrapJS = function bootstrapJS() {
  // TODO: create a Bower component for this
  if (this.includeRequireJS && this.bootstrapFlavor !== 'none') {
    this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
  }
};

AppGenerator.prototype.mainJS = function mainJS() {
  if (!this.includeRequireJS) {
    return;
  }
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.coffee ? 'coffee' : 'js';
  var mainJsFile = this.engine(this.read('requirejs_app.' + ext), this);

  this.write('app/scripts/main.' + ext, mainJsFile);
};

AppGenerator.prototype.createAppFile = function createAppFile() {
  if (this.includeRequireJS) {
    return;
  }
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.coffee ? 'coffee' : 'js';
  this.template('app.' + ext, 'app/scripts/main.' + ext);
};
