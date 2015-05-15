var ConferenceService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var session = null;
        var l = sessions.length;
        for (var i=0; i < l; i++) {
            if (sessions[i].id === id) {
                session = sessions[i];
                break;
            }
        }
        deferred.resolve(session);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = sessions.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }

    this.findAll = function() {
        var deferred = $.Deferred();
        deferred.resolve(sessions);
        return deferred.promise();
    }

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
    //var sessions2 = [
    //    {"id": 1, "firstName": "Anis", "lastName": "Kadri", "position": "Sr Software Engineer", "company": "Adobe", "city": "San Francisco, US", "pic": "anis_kadri.jpg", "twitterId": "@aniskadri", "blog": "http://imhotep.koalabs.org"},
    //    {"id": 2, "firstName": "Ben", "lastName": "Sperry", "position": "Co-founder/CEO", "company": "Ionic", "city": "Madison", "pic": "ben_sperry.jpg", "twitterId": "@benjsperry", "blog": "http://bensperry.com"},
    //    {"id": 3, "firstName": "Brian", "lastName": "LeRoux", "position": "SPACELORD!1!!", "company": "Adobe", "city": "San Francisco, CA", "pic": "brian_leroux.jpg", "twitterId": "@brianleroux", "blog": "http://brianleroux.com"},
    //    {"id": 4, "firstName": "Christian", "lastName": "Heilmann", "position": "HTML5/Open Web Evangelist",
    //        "company": "Microsoft", "city": "London, UK", "pic": "christian_heilmann.jpg", "twitterId": "@codepo8", "blog": "http://christianheilman.com"},
    //    {"id": 5, "firstName": "Claudio", "lastName": "Cossio", "position": "Software Engineer",  "company": "Nearsoft", "city": "Boston, MA", "pic": "claudio_cossio.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
    //    {"id": 6, "firstName": "Holly", "lastName": "Schinsky", "position": "Developer Advocate", "company": "Adobe", "city": "Tampa, FL", "pic": "holly_schinsky.jpg", "twitterId": "@devgirlfl", "blog": "http://devgirl.org"},
    //    {"id": 7, "firstName": "Martin", "lastName": "Kool", "position": "Interaction Engineer",
    //        "company": "Q42", "city": "Amsterdam", "pic": "martin_kool.jpg", "twitterId": "@mrtnkl", "blog": "http://martinkool.com/"},
    //    {"id": 8, "firstName": "Matt", "lastName": "May", "position": "Accessibility Evangelist", "company": "Adobe", "city": "Seattle, WA", "pic": "matt_may.jpg", "twitterId": "@mattmay", "blog": "http://www.bestkungfu.com/"},
    //    {"id": 9, "firstName": "Max", "lastName": "Lynch", "position": "Co-founder/CEO", "company": "Ionic", "city": "Madison", "pic": "max_lynch.jpg", "twitterId": "@maxlynch", "blog": "http://maxlynch.com"},
    //    {"id": 10, "firstName": "Michael", "lastName": "Brooks", "position": "Senior Software Barista", "company": "Adobe", "city": "Vancouver", "pic": "michael_brooks.jpg", "twitterId": "@mwbrooks", "blog": "http://michaelbrooks.ca"},
    //    {"id": 11, "firstName": "Niels", "lastName": "Leenheer", "position": "Sotware Engineer", "company": "Salonhub", "city": "Drachten, The Netherlands", "pic": "niels_leenheer.jpg", "twitterId": "@html5test", "blog": "http://html5test.com"},
    //    {"id": 12, "firstName": "Simon", "lastName": "MacDonald", "position": "Sr Software Engineer", "company": "Adobe", "city": "Ottawa, CA", "pic": "simon_macdonald.jpg", "twitterId": "@macdonst", "blog": "http://simonmacdonald.blogspot.com/"},
    //    {"id": 13, "firstName": "Syd", "lastName": "Lawrence", "position": "Keyboard Enthusiast", "company": "wemakeawesomesh", "city": "London & Austria", "pic": "syd_lawrence.jpg", "twitterId": "@sydlawrence", "blog": "http://wemakeawesomesh.it"}
    //]
}