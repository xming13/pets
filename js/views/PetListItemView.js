define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/pet/PetListItemTemplate.html'
], function($, _, Backbone, petListItemTemplate) {

    var PetListItemView = Backbone.View.extend({

        tagName: 'li',

        className: function() {
            return this.model.get('type') + '-wrapper pet-wrapper';
        },

        template: _.template(petListItemTemplate),

        events: {
            'click a.delete': 'delete',
            'click a.action-feed': 'feed',
            'click a.action-exercise': 'exercise',
            'click a.action-sleep': 'sleep',
            'click .pet-name': 'edit',
            'mouseover': 'mouseover',
            'mouseleave': 'mouseleave'
        },

        initialize: function(options) {
            console.log('PetListItemView initialize');
            // In Backbone 1.1.0, if you want to access passed options in
            // your view, you will need to save them as follows:
            this.options = options || {};

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {
            console.log('PetListItemView render()');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        delete: function() {
            if (confirm('Are you sure you want to release this pet?')) {
                this.model.destroy();
            }
        },

        feed: function() {
            this.model.eat();
        },

        exercise: function() {
            this.model.exercise();
        },

        sleep: function() {
            this.model.sleep();
        },

        edit: function() {
            console.log('edit');
            console.log('navigate to pet/' + this.model.id + '/edit');
            //appRouter.navigate('pet/' + this.model.id + '/edit', true);
        },

        mouseover: function() {
            this.$('a.delete').show();
        },

        mouseleave: function() {
            this.$('a.delete').hide();
        }

    });

    return PetListItemView;

});