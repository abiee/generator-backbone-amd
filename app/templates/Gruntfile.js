// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        watch: {<% if (coffee) { %>
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },<% } %><% if (bootstrapFlavor === 'sass') { %>
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% } else if (bootstrapFlavor === 'less') { %>
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}/*.less'],
                tasks: ['less']
            },<% } %>
            styles: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }<% if (templateFramework === 'mustache') { %>,
            mustache: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.mustache'
                ],
                tasks: ['mustache']
            }<% } else if (templateFramework === 'handlebars') { %>,
            handlebars: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.hbs'
                ],
                tasks: ['handlebars']
            }<% } else { %>,
            jst: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            }<% } %><% if (testFramework === 'jasmine') { %>,
            test: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test']
            }<% } %>
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (coffee) { %>
        coffeelint: {
            all: [
                '<%%= yeoman.app %>/scripts/{,*/}*.coffee',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.coffee'
            ]
        },<% } %><% if (testFramework === 'mocha') { %>
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %><% if (coffee) { %>
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },<% } %><% if (bootstrapFlavor === 'sass') { %>
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } else if (bootstrapFlavor === 'less') { %>
        less: {
            options: {
                paths: [
                    '<%%= yeoman.app %>/bower_components',
                    '<%%= yeoman.app %>/styles'
                ],
                //dumpLineNumbers: true
            },
            dist: {
                files: [{
                    expand: true,                       // Enable dynamic expansion.
                    cwd: '<%%= yeoman.app %>/styles/',  // Src matches are relative to this path.
                    src: ['{,*/}*.less'],               // Actual pattern(s) to match.
                    dest: '.tmp/styles/',               // Destination path prefix.
                    ext: '.css',                        // Dest filepaths will have this extension.
                }],
            },
            server: {
                files: [{
                    expand: true,                       // Enable dynamic expansion.
                    cwd: '<%%= yeoman.app %>/styles/',  // Src matches are relative to this path.
                    src: ['{,*/}*.less'],               // Actual pattern(s) to match.
                    dest: '.tmp/styles/',               // Destination path prefix.
                    ext: '.css',                        // Dest filepaths will have this extension.
                }],
            }
        },<% } %>
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },<% if (includeRequireJS) { %>
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%%= yeoman.app %>/scripts',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true<% if (templateFramework !== 'handlebars') { %>,
                    wrap: true<% } %>
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },<% } else { %>
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/<% } %>
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/index.html',
                ignorePath: '<%%= yeoman.app %>/'
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'<% if (bootstrapFlavor === 'sass') { %>,
                        'bower_components/sass-bootstrap/fonts/*.*'<% } else if (bootstrapFlavor === 'less') { %>,
                        'bower_components/bootstrap/fonts/*.*'<% } %>
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },<% if (includeRequireJS) { %>
        bower: {
            all: {
                rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
            }
        },<% } %><% if (templateFramework === 'mustache') { %>
        mustache: {
            files: {
                src: '<%%= yeoman.app %>/scripts/templates/',
                dest: '.tmp/scripts/templates.js',
                options: {<% if (includeRequireJS) { %>
                    prefix: 'define(function() { this.JST = ',
                    postfix: '; return this.JST;});'<% } else { %>
                    prefix: 'this.JST = ',
                    postfix: ';'<% } %>
                }
            }
        }<% } else if (templateFramework === 'handlebars') { %>
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST'<% if (includeRequireJS) { %>,
                    amd: true<% } %>
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.hbs']
                }
            }
        }<% } else { %>
        jst: {<% if (includeRequireJS) { %>
            options: {
                amd: true
            },<% } %>
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        }<% } %>,<% if (includeModernizr) { %>
        modernizr: {
            devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>
        concurrent: {
            server: [<% if (bootstrapFlavor === 'sass') { %>
                'compass',<% } else if (bootstrapFlavor === 'less') { %>
                'less',<% } %><% if (coffee) { %>
                'coffee:dist',<% } %>
                'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
                'mustache',<% } else if (templateFramework === 'handlebars') { %>
                'handlebars',<% } else { %>
                'jst',<% } %>
                'copy:styles'
            ],
            test: [<% if (coffee) { %>
                'coffee',<% } %>
                'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
                'mustache',<% } else if (templateFramework === 'handlebars') { %>
                'handlebars',<% } else { %>
                'jst',<% } %>
                'copy:styles'
            ],
            dist: [<% if (coffee) { %>
                'coffee',<% } %><% if (bootstrapFlavor === 'sass') { %>
                'compass',<% } else if (bootstrapFlavor === 'less') { %>
                'less',<% } %>
                'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
                'mustache',<% } else if (templateFramework === 'handlebars') { %>
                'handlebars',<% } else { %>
                'jst',<% } %>
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',<% if (testFramework === 'mocha') { %>
        'mocha'<% } else if (testFramework === 'jasmine') { %>
        'jasmine'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'requirejs',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
