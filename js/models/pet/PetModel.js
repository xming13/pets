define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

    var PetModel = Backbone.Model.extend({
        defaults: {
            type: 'rabbit',
            name: 'White Bunny',
            state: 'exercise'
        },

        // used for backbone form
        schema: {
            type: { type: 'Select', options: ['rabbit', 'piglet'] },
            name: 'Text'
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

    return PetModel;

});