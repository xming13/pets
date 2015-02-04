define([
    'jquery',
    'underscore',
    'backbone',
    'collections/pet/PetCollection',
    'views/PetListItemView'
], function($, _, Backbone, PetCollection, PetListItemView) {

    var PetListView = Backbone.View.extend({

        tagName: 'ul',

        initialize: function() {

            this.collection = PetCollection;
            console.log('PetListView initialize:', this.collection);
            this.collection.fetch();

            var self = this;
            this.collection.each(function(pet) {
                var view = new PetListItemView({model: pet});
                self.$el.append(view.render().el);
            });
        },

        render: function() {
            console.log('PetListView render()');
            return this;
        }

    });

    return PetListView;

});