// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    SessionListView.prototype.template = Handlebars.compile($("#session-list-tpl").html());
    SessionView.prototype.template = Handlebars.compile($("#session-tpl").html());

    var service = new ConferenceService();
    service.initialize().done(function () {
        router.addRoute('', function() {
            console.log('empty');
            $('body').html(new HomeView(service).render().$el);
        });

        router.addRoute('sessions/:id', function(id) {
            console.log('details');
            service.findById(parseInt(id)).done(function(session) {
                $('body').html(new SessionView(session).render().$el);
            });
        });

        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());