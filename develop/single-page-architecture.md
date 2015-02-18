---
layout: module
title: Single Page Architecture
---

##Mobile Best Practices: Single Page Architecture (SPA)

####Overview
Single page applications refer to apps that can redraw any part of the UI without requiring a server roundtrip to retrieve HTML. The page does not automatically reload during user interaction with the application or transfer control to another page. Instead, state changes occur via JavaScript using templates and DOM manipulation. 

In SPA’s the application logic is shifted from the web server to the client (device). The result is a more fluid and native-like user experience. 

![image](../images/spa.png)

**Figure 1:** Single Page App Architecture Diagram. Client represents mobile device or browser.


####Characteristics

+ **Routing** – navigation and view selection without reload preserving state, elements and data. Often implemented via a hash (#) URL fragments and parameters (ie: http://myapp.com/#show/1234). (see [AngularJS](http://angularjs.org), [Backbone.js](http://backbonejs.org), [Ember](http://emberjs.com), [Knockout](http://knockoutjs.com) etc)

+ **Templating** – coding of the UI and DOM manipulations are replaced by declarative binding of data to HTML templates. (see [Mustache.js](http://mustache.github.io/), [Underscore.js](http://underscorejs.org)

+ **Controllers** – JavaScript code to handle state changes, data manipulation, AJAX calls etc and that separate views and models using MVC or MVVM patterns. (see AngularJS, Backbone.js, Ember, Knockout etc)

+ **Real-time communication** – two-way communication of a client application and web server replaces one-way requests from a browser

+ **Chunking** – chunks of HTML fragments and JSON data are loaded instead of receiving full HTML from a web server on every request. 
Local storage – data often stored locally for performance and offline access rather than intensive data loads from the web server (HTML5 Local Storage).


####Best Practices
1. Load data locally first before going to server
2. Handle for offline scenarios
3. Cache Images and Resources

####Benefits
+ Less network bandwidth is needed and used
+ Navigation is much faster by staying on the client

#####Additional Reading
[Single Page App Book](http://singlepageappbook.com/)
