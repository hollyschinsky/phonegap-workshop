var HomeView = function (service) {

    var sessionListView;

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', this.findByName);
        sessionListView = new SessionListView();
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(sessionListView.$el);
        return this;
    };

    this.findByName = function() {
        service.findByName($('.search-key').val()).done(function(sessions) {
            sessionListView.setSessions(session);
        });
    };

    this.initialize();

}