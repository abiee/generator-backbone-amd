generator-backbone-amd
======================

Yeoman generator for Backbone with AMD capabilities

Install
-------
You can install this generator by two ways, clonning repo and linking or install by npm. To install clonnig repo run:

    $ git clone https://github.com/abiee/generator-backbone-amd.git
    $ cd generator-backbone-amd
    $ npm link

Or to install by npm run:

    $ npm install https://github.com/abiee/generator-backbone-amd.git

Bootstrap project
-----------------
To bootstrap a new project simply run

    $ yo backbone-amd

Create model
------------
To add a Backbone model to the project use the model generator like this

    $ yo backbone-amd:model model-name

Create collection
-----------------
To add a Backbone collection to the project use collection generator

    $ yo backbone-amd:collection collection-name

You can link the collection with an existent model

    $ yo backbone-amd:collection collection-name model-name

Or may be you want to create both, model and collection on one step

    $ yo backbone-amd:collection collection-name model-name --create-model

Create views
------------
Backbone works with view definitions, to create one use this command

    $ yo backbone-amd:view view-name

If you prefer CoffeeScript instead just add --coffee flag

    $ yo backbone-amd:view view-name --coffee

Create routers
--------------
You can generate routers too with

    $ yo backbone-amd:router router-name

Or with coffee option

    $ yo backbone-amd:router router-name --coffee
