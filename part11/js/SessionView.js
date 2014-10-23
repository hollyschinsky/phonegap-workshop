var SessionView = function(session) {

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template(session));
        return this;
    };

    this.initialize();

}
