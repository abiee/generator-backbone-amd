generator-backbone-amd
======================

Yeoman generator for Backbone with AMD capabilities

Install
-------
You can install this generator by two ways, clonning repo and linking or install by npm. To install clonnig repo run:

    $ git clone https://github.com/Abiee/generator-backbone-amd.git
    $ cd generator-backbone-amd
    $ npm link

Or to install by npm run:

    $ npm install https://github.com/Abiee/generator-backbone-amd.git

Bootstrap project
-----------------
To bootstrap a new project simply run

    $ yo backbone-amd

Add views
---------
Backbone works with view definitions, to create one use this command

    $ yo backbone-amd:view view-name-here

If you prefer CoffeeScript instead just add --coffee flag

    $ yo backbone-amd:view view-name-here --coffee
