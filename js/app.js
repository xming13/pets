$(function() {

    // Router
    var PetRouter = Backbone.Router.extend({
        routes: {
            'pet/:id': 'viewPet',
            'pet/:id/edit': 'editPet',
            'pet/add': 'addPet'
        },

        viewPet: function(id){
            console.log("View pet requested.");
            this.navigate("pet/" + id + '/edit'); // updates the fragment for us, but doesn't trigger the route
        },

        editPet: function(id) {
            console.log("Edit pet opened.");
        },

        addPet: function() {
            console.log('Adopt a new pet!');
        }
    });

    var myPetRouter = new PetRouter();

    Backbone.history.start();

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
        el: $('#pet-app'),

        events: {
            'click .add-pet': 'goToAdd'
        },

        initialize: function() {
            this.$main = this.$('#main');
            this.$footer = this.$('#footer');

            this.listenTo(MyPets, 'add', this.addOne);
            this.listenTo(MyPets, 'reset', this.addAll);

            MyPets.fetch();
        },

        render: function() {

        },

        goToAdd: function() {
            console.log('goToAdd');
            myPetRouter.navigate('pet/add');
        },

        addOne: function(pet) {
            var view = new PetView({model: pet});
            this.$("#pet-list").append(view.render().el);
        },

        addAll: function() {
            this.$('#pet-list').html('');
            MyPets.each(this.addOne, this);
        }

    });

    var App = new AppView();
});