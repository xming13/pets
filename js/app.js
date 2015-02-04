define(['jquery', 'underscore', 'backbone', 'router'], function($, _, Backbone, Router) {
    Backbone.View.prototype.close = function () {
        console.log('Closing view ', this);

        if (this.beforeClose) {
            this.beforeClose();
        }

        this.remove();
        this.unbind();
    };

    var initialize = function() {
        console.log('router initialize');
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});