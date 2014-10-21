// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new ConferenceService();
    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function() {
        alert("PhoneGap Day v1.0");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (sessions) {
            var l = sessions.length;
            var e;
            $('.session-list').empty();
            for (var i = 0; i < l; i++) {
                e = sessions[i];
                $('.session-list').append('<li><a href="#sessions/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }

}());