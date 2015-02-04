define([
    'jquery',
    'underscore',
    'backbone',
    'backboneform',
    'models/pet/PetModel',
    'collections/pet/PetCollection'
], function($, _, Backbone, BackboneForm, PetModel, PetCollection) {

    var PetView = Backbone.View.extend({

        initialize: function() {
            if (!this.model) {
                this.model = new PetModel();
            }
            if (!this.form) {
                this.form = new BackboneForm({
                    model: this.model,
                    submitButton: 'Add'
                });
            }

            this.form.on('type:change', function(form, typeEditor) {
                var petType = typeEditor.getValue();
                var petDefaultName = '';

                switch (petType) {
                    case 'rabbit':
                        petDefaultName = 'White bunny';
                        break;
                    case 'piglet':
                        petDefaultName = 'Little piglet';
                        break;
                }
                form.fields.name.editor.setValue(petDefaultName);
            });

            this.form.on('submit', function(event) {
                event.preventDefault();

                // save the form values to the model's attributes
                this.commit();

                if (this.model.isNew()) {
                    console.log('creating new pet');
                    PetCollection.create(this.model);
                }
                else {
                    console.log('editing existing pet');
                    this.model.save();
                }

                console.log('navigate to \'\'');
                //appRouter.navigate('', true);
            });
        },

        render: function() {
            console.log('PetView render()');

            return this.form.render();
        }

    });

    return PetView;

});