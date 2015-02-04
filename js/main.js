require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: "Backbone"
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
   paths: {
       jquery: 'libs/jquery/jquery.1.9.1.min',
       underscore: 'libs/underscore/underscore-min',
       backbone: 'libs/backbone/backbone',
       backboneLocalstorage: 'libs/backbone/backbone.localStorage',
       backboneform: 'libs/backbone/backbone-forms.min',
       templates: '../templates'
   }
});

require(['app'], function(App) {
    console.log('App.initialize');
    App.initialize();
});