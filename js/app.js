$(function() {

    // Models
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

    // Views
    Backbone.View.prototype.close = function () {
        console.log('Closing view ' + this);

        if (this.beforeClose) {
            this.beforeClose();
        }

        this.remove();
        this.unbind();
    };

    var PetListView = Backbone.View.extend({

        tagName: 'ul',

        initialize: function() {
            this.listenTo(MyPets, 'change', this.render);
            MyPets.fetch();
        },

        render: function() {
            console.log('PetListView render()');

            var self = this;
            MyPets.each(function(pet) {
                var view = new PetListItemView({model: pet});
                self.$el.append(view.render().el);
            });

            return this;
        }

    });

    var PetListItemView = Backbone.View.extend({

        tagName: 'li',

        className: function() {
            return this.model.get('type') + '-wrapper pet-wrapper';
        },

        template: _.template($('#pet-template').html()),

        events: {
            'click a.delete': 'delete',
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
        }

    });

    var PetView = Backbone.View.extend({

        template: _.template($('#pet-view-template').html()),

        render: function() {
            console.log('PetView render()');
            return this;
        }

    });

    // Router
    var PetRouter = Backbone.Router.extend({

        routes: {
            '': 'listPet',
            'pet/:id': 'viewPet',
            'pet/:id/edit': 'editPet',
            'pet/add': 'addPet'
        },

        listPet: function() {
            this.showView('#main', new PetListView({model: MyPets}));
        },

        viewPet: function(id){
            console.log("View pet requested.");
            var pet = MyPets.get(id);
            this.showView('#main', new PetView({model: pet}));
        },

        editPet: function(id) {
            console.log("Edit pet opened.");
            var pet = MyPets.get(id);
            this.showView('#main', new PetView({model: pet}));
        },

        addPet: function() {
            console.log('Adopt a new pet!');
            this.showView('#main', new PetView({model: new Pet()}));
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

    var myPetRouter = new PetRouter();

    Backbone.history.start();

});