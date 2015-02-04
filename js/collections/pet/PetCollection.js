define(['jquery', 'underscore', 'backbone', 'backboneLocalstorage', 'models/pet/PetModel'], function($, _, Backbone, Store, PetModel) {

    var PetCollection = Backbone.Collection.extend({

        model: PetModel,

        localStorage: new Store("pets-backbone")

    });

    var petCollection = new PetCollection();

    return petCollection;

});