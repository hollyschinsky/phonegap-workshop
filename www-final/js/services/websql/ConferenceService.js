var ConferenceService = function () {

    this.initialize = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("conferenceDemoDB", "1.0", "conference Demo DB", 200000);
        this.db.transaction(
            function (tx) {
                createTable(tx);
                addSampleData(tx);
            },
            function (error) {
                console.log('Transaction error: ' + error);
                deferred.reject('Transaction error: ' + error);
            },
            function () {
                console.log('Transaction success');
                deferred.resolve();
            }
        );
        return deferred.promise();
    }

    this.findByName = function (searchKey) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.description, e.room, e.time, e.twitter_id, e.pic " +
                    "FROM session e " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function (tx, results) {
                    var len = results.rows.length,
                        sessions = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        sessions[i] = results.rows.item(i);
                    }
                    deferred.resolve(sessions);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    }

    this.findById = function (id) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.description, e.room, e.time, e.twitter_id, e.pic " +
                    "FROM session e " +
//                    "LEFT JOIN session r ON r.managerId = e.id " +
//                    "LEFT JOIN session m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function (tx, results) {
                    deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    };

    var createTable = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS session');
        var sql = "CREATE TABLE IF NOT EXISTS session ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "title VARCHAR(50), " +
            "description VARCHAR(50), " +
            "time VARCHAR(50), " +
            "room VARCHAR(50), " +
            "twitter_id VARCHAR(50), " +
            "pic VARCHAR(50))";
        tx.executeSql(sql, null,
            function () {
                console.log('Create table success');
            },
            function (tx, error) {
                alert('Create table error: ' + error.message);
            });
    }

    var addSampleData = function (tx, sessions) {

        var sessions = [
            { "id":0,
                "title":"Embedding Natively: The Hybrid Sweet Spot",
                "firstName":"Anis","lastName":"Kadri","pic":"anis_kadri.jpg",
                "time":"10:00am","room":"Ballroom F","twitter_id":"aniskadri",
                "description":"Leveraging native and web components to find that hybrid sweet spot and take advantage of the best of both worlds with embedded webviews."
            },
            { "id":1,
                "title":"Workshop: PhoneGap Enterprise",
                "firstName":"Anthony","lastName":"Rumsey","pic":"anthony_rumsey.jpg",
                "time":"4:45pm","room":"Ballroom A","twitter_id":"planetrumsey",
                "description":"See a sneak peek demo of the latest features coming soon to PhoneGap Enterprise and Adobe Experience Manager."
            },
            { "id":2,
                "title":"Workshop: Intro to PhoneGap",
                "firstName":"Michael","lastName":"Brooks","pic":"michael_brooks.jpg",
                "time":"10:00am","room":"Theater","twitter_id":"mwbrooks",
                "description":"This workshop will provide an introduction to PhoneGap, the philosophy behind it and how to get started quickly using a variety of different tools available. The CLI, PhoneGap Developer App, PhoneGap Build and more will be shown and you will learn about the many frameworks available to choose from when building your mobile apps. You will also be shown debugging techniques and walk away with a solid understanding of what PhoneGap is all about."
            },
            { "id":3,
                "title":"Workshop: Architecting PhoneGap Apps ",
                "firstName":"Holly","lastName":"Schinsky","pic":"holly_schinsky.jpg",
                "time":"1:00pm","room":"Theater","twitter_id":"devgirlfl",
                "description":"Learn how to architect large, complex, and native-like PhoneGap apps using HTML, JavaScript, and CSS. We will investigate mobile challenges and find solutions for them as well as learn all about Single Page Architecture, HTML templates, effective touch events, performance techniques, MVC Frameworks and more."
            },
            { "id":4,
                "title":"Achievement Unlocked: You've just added Achievements and Leaderboards to your HTML5 game for iOS and Android",
                "firstName":"Martin","lastName":"Kool","pic":"martin_kool.jpg",
                "time":"9:00am","room":"Ballroom A","twitter_id":"mrtnkl",
                "description":"Learn how to easily add achievements and leaderboards to your HTML5 games for iOS and Android."
            },
            { "id":5,
                "title":"Open Web",
                "firstName":"Christian","lastName":"Heilmann","pic":"christian_heilmann.jpg",
                "time":"2:00pm","room":"Ballroom D","twitter_id":"codepo8",
                "description":"."
            },
            { "id":6,
                "title":"Reframing Hybrid",
                "firstName":"Max","lastName":"Lynch","pic":"max_lynch.jpg",
                "time":"11:00am","room":"Ballroom C","twitter_id":"maxlynch",
                "description":"Taking a refreshed look at hybrid applications and we can leverage the benefits of using web standards and cross platform code base while still building quality high performing mobile applications."
            },
            { "id":7,
                "title":"PhoneGap Accessibility",
                "firstName":"Matt","lastName":"May","pic":"matt_may.jpg",
                "time":"1:00pm","room":"Ballroom B","twitter_id":"mattmay",
                "description":"Learn how to handle Accessibility concerns within your PhoneGap apps."
            },
            { "id":8,
                "title":"Luck + Motion: User Growth for your App",
                "firstName":"Claudio","lastName":"Cossio","pic":"claudio_cossio.jpg",
                "time":"3:00pm","room":"Theater","twitter_id":"fakejking",
                "description":"Find out how to use luck and motion to grow the user base for your mobie hybrid apps."
            },
            { "id":9,
                "title":"The Android Webview",
                "firstName":"Niels","lastName":"Leenheer","pic":"niels_leenheer.jpg",
                "time":"9:00am","room":"Theater","twitter_id":"html5test",
                "description":"Everything you wanted to know about the Android Webview. And more."
            },
            { "id":10,
                "title":"Push & Pull",
                "firstName":"Simon","lastName":"MacDonald","pic":"simon_macdonald.jpg",
                "time":"2:00pm","room":"Theater","twitter_id":"macdonst",
                "description":"Learn how to implement and push notifications with your hybrid mobile apps."
            },
            { "id":11,
                "title":"Snowbuddy: How we made people think it was a native app",
                "firstName":"Syd","lastName":"Lawrence","pic":"syd_lawrence.jpg",
                "time":"10:00am","room":"Theater","twitter_id":"sydlawrence",
                "description":"Find out some tips and tricks on how to build native looking apps using HTML5, JavaScript and CSS."
            },
            { "id":12,
                "title":"Sneak Peek at What's New in Ionic",
                "firstName":"Ben","lastName":"Sperry","pic":"ben_sperry.jpg",
                "time":"11:00am","room":"Ballroom C","twitter_id":"bensperry",
                "description":"Check out what's new in Ionic and get some demo's of their latest services."
            }
        ];
        var l = sessions.length;
        var sql = "INSERT OR REPLACE INTO session " +
            "(id, firstName, lastName, title, description, time, room, twitter_id, pic) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = sessions[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.title, e.description, e.time, e.room, e.twitter_id, e.pic],
                function () {
                    console.log('INSERT success');
                },
                function (tx, error) {
                    alert('INSERT error: ' + error.message);
                });
        }
    }

}