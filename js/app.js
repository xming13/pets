$(function() {
    // Model
    var Pet = Backbone.Model.extend({
        defaults: {
            type: 'rabbit',
            name: 'White Bunny',
            state: 'exercise'
        },

        initialize: function() {
            console.log('A pet has been initialized.', this);
        },

        exercise: function() {
            console.log('Health is very important!!');
            this.set('state', 'exercise');
        },

        eat: function() {
            console.log('Nomnomnom.. <3.');
            this.set('state', 'eat');
        },

        sleep: function() {
            console.log('Zzz To rest is to prepare for a longer journey ahead!');
            this.set('state', 'sleep');
        }
    });

    var PetList = Backbone.Collection.extend({
        model: Pet,
        localStorage: new Backbone.LocalStorage("pets-backbone")
    });

    var MyPets = new PetList();

    // View
    var PetView = Backbone.View.extend({

        tagName: 'div',
        className: function() {
            return this.model.get('type') + '-wrapper pet-wrapper';
        },

        // Cache the template function for a single item.
        template: _.template($('#pet-template').html()),

        events: {
            'click a.action-feed': 'feed',
            'click a.action-exercise': 'exercise',
            'click a.action-sleep': 'sleep'
        },

        initialize: function(options) {
            // In Backbone 1.1.0, if you want to access passed options in
            // your view, you will need to save them as follows:
            this.options = options || {};

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        feed: function() {
            this.model.eat();
        },

        exercise: function() {
            this.model.exercise();
        },

        sleep: function() {
            this.model.sleep();
        }
    });

    var AppView = Backbone.View.extend({
        el: $('#main'),

        initialize: function() {
            this.listenTo(MyPets, 'add', this.addOne);
            this.listenTo(MyPets, 'all', this.render);

            MyPets.fetch();
        },

        render: function() {

        },

        addOne: function(pet) {
            var view = new PetView({model: pet});
            this.$("#pet-list").append(view.render().el);
        }

    });

    var App = new AppView();
});