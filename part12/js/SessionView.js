var SessionView = function(session) {

    this.initialize = function() {
        this.$el = $('<div/>');

        this.$el.on('click', '.addBtn', this.addToCalendar);
    };

    this.render = function() {
        this.$el.html(this.template(session));
        return this;
    };

    this.addToCalendar = function() {
        if (window.plugins.calendar) {
            var hour = session.time.substring(0,session.time.indexOf(':'));
            if (session.time.indexOf("pm")>-1)
                hour = parseInt(hour)+12;

            var startDate = new Date(2014,9,23,hour,00,00);
            var endDate = new Date();
            endDate.setTime(startDate.getTime() + 3600000);//one hour

            window.plugins.calendar.createEvent(session.title, session.room, session.description, startDate, endDate,
                function(){alert(session.title + " has been added to your calendar.");}, function (error) {
                    console.log("Calendar fail " + error);
                });
        }
        else console.log("Calendar plugin not found");
    }

    this.initialize();

}
