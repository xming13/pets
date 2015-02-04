define([
    'jquery',
    'underscore',
    'backbone',
    'collections/pet/PetCollection',
    'models/pet/PetModel',
    'views/PetListView',
    'views/PetView'
], function($, _, Backbone, PetCollection, PetModel, PetListView, PetView) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'listPet',
            'pet/:id': 'viewPet',
            'pet/:id/edit': 'editPet',
            'pet/add': 'addPet'
        },

        listPet: function() {
            var petListView = new PetListView();
            this.showView('#main', petListView);
        },

        viewPet: function(id) {
            var pet = PetCollection.get(id);
            var petView = new PetView({model: pet});
            this.showView('#main', petView);
        },

        editPet: function(id) {
            var pet = PetCollection.get(id);
            var petView = new PetView({model: pet});
            this.showView('#main', petView);
        },

        addPet: function() {
            var pet = new PetModel();
            var petView = new PetView({model: pet});
            this.showView('#main', petView);
        },

        showView: function(selector, view) {
            if (this.currentView) {
                this.currentView.close();
            }
            $(selector).html(view.render().el);
            this.currentView = view;
            return view;
        }

    });

    var initialize = function() {

        var appRouter = new AppRouter();

        Backbone.history.start();

    };

    return {
        initialize: initialize
    };
});
