##Status Bar Handling

Status Bar Simulator App - CLICK ME!

<a name="simulator"><div style="background-image:url('http://devgirl.org/wp-content/uploads/2014/05/iphone5.png');background-repeat:no-repeat;margin: 0px 0px 0px 120px;padding: 125px 0px 0px 27px;width:375px;height:695px;">
<iframe src="http://devgirl.org/files/StatusBarDemo/www/" width="320" height="568" frameborder="0">
</iframe> 
</div></a>

 
###StatusBar and iOS7

If you’re building PhoneGap/Cordova applications for iOS, you’ve likely run into the iOS7 issue where the status bar overlaps the content in the top portion of your application where a navigation bar would typically display. This is due to the iOS7 change for ViewControllers (containing the WebView running your PhoneGap application) to display full screen by default with a transparent Status Bar overlaying it rather than having its own designated space in the top 20 pixels of the screen as before. You can see how the status bar now appears to blend in with the header content in the image below from the Apple docs showing iOS7 vs iOS6:

![http://devgirl.org/wp-content/uploads/2014/07/statusbar-problem.png](http://devgirl.org/wp-content/uploads/2014/07/statusbar-problem.png)

###Solutions

There are different ways to handle this iOS7 change in your applications. One common solution on the web side is to offset the application content by 20 pixels from the top to account for the status bar when the platform is detected as iOS7 using the Cordova Device Plugin.

Some UI frameworks like Ionic actually do this for you. They use the Cordova Device plugin (installed automatically when you create a new ionic project with the CLI) to detect the platform details and will apply different CSS classes to the navigation bars and other UI objects to handle things based on platform and OS versions.

There’s also a native solution available via the Cordova Status Bar plugin. This plugin is also used to alter the appearance of the status bar (color/style) from the native side so you can customize your applications to fit your specific needs.
Install the Plugin

To use the Status Bar plugin, first install it in the usual manner:

	$ cordova plugin add org.apache.cordova.statusbar

###Plugin - Usage

####Fix Overlap

The StatusBar Plugin can be used to natively address the overlap issue by setting `StatusBarOverlaysWebview` preference to false in the `config.xml` or programmatically via the `overlaysWebView()` method.

If the overlay is found to be true, which it is by default, the application will have the default iOS7 behavior where the transparent status bar is overlapping the application’s WebView. This is why you see it displayed this way without making any additional changes even after adding this plugin:

statusbar-problem

However it can be set to false to allow the status bar to have its own set space as in iOS6. Setting StatusBarOverlaysWebview to false also allows a color to be applied to the background as shown in black here:
statusbar-problem-fix

You can see in the snippets below how this is handled in the plugin Obj-C code if you’re curious. (I removed some pieces of code to keep it simpler for this post).


	if (statusBarOverlaysWebView) {
       ...
       	self.webView.frame = bounds;       
	} else {
        ...
        	CGRect statusBarFrame = [UIApplication 	sharedApplication].statusBarFrame;
        	CGRect frame = self.webView.frame;
	        frame.origin.y = statusBarFrame.size.height;
    	    frame.size.height -= statusBarFrame.size.height;  
        	...
	        self.webView.frame = frame;        
	}`
To keep more of the iOS7 feel, set the background color of the status bar to match your application background color. See the next section for details.
Customizing via Configuration Settings

If you’re looking to control the status bar overlay value, color, or style you can do so by simply tweaking some configuration preferences for the Status Bar Plugin to use with no manual code required.

When the status bar plugin is added, preferences it uses for iOS are added into the ios platform config.xml automatically with the following values (see in your project path under myProj/platforms/ios/myProj/config.xml for instance):




	<preference name="StatusBarOverlaysWebView" value="true" /> 
	<preference name="StatusBarBackgroundColor" value="#000000" />
	<preference name="StatusBarStyle" value="lightcontent" />
	
If you didn’t add the plugin at all or customize anything on your status bar, the default foreground/text color is black and the default background color will be the color of your application’s background for iOS7 since it’s transparent. By just adding the plugin and doing nothing more however, you are already customizing it with the above preferences since they are added automatically, so you need to be aware of this.

To change the configuration preferences, be sure to first copy them into your root project **config.xml** (ie: myProj/config.xml) and tweak them there since the platform config files get rebuilt each time you build/run with the CLI and you will lose any changes made there. (You don’t need to copy the <feature> element lines for the plugin itself, just these preferences).

###Setting Colors

`StatusBarBackgroundColor` sets the background color of the bar but ONLY when `StatusBarOverlaysWebView` is false
`StatusBarStyle` sets the foreground color, including the text and icons

####Explanation
It may be confusing if you tried to run the application now with the status bar plugin and preferences added as above because you might expect to see a black background based on the preference set for `StatusBarBackgroundColor` to #000000. However, this preference is only used when the `StatusBarOverlaysWebView` is false. In other words, background color can only be set if it’s iOS6 style and not the iOS7 transparent overlay, but that setting is true initially so you’d have to change it to false yourself if you want to set a specific color.

###Status Bar Styles

The `default` and `blacktranslucent` values display black foreground text and icons.
The `lightcontent` and `blackopaque` values display white foreground text and icons.
This setting is applied without regard to the status bar background color so if you accidentally pick the same color for both, you will not see any status bar, just a 20px white or black bar at the top of your application.

Also, the `StatusBarStyle` preference for text color is applied regardless of the `StatusBarOverlaysWebView` value since it just sets the text/foreground color and can be set on a transparent status bar.

It can be a little confusing to set this preference based on just looking at the available values compared to the results. Since both `blacktranslucent` and default display black text and both `blackopaque` and `lightcontent` display white text you may question when to use which or wonder what the difference is, the names make this a little more confusing still. It should help to know these values map directly to the native Apple values for the `UIStatusBarStyle` and the `blacktranslucent` and `blackopaque` were deprecated in iOS7 but the plugin options are still available to maintain backwards compatibility.

**Tip:** Stick with using default for black text and `lightcontent` for white text to avoid further confusion. 
Use the Status Bar Simulator App

Now that you understand the options more thoroughly, click here to go back to the Status Bar Simulator app to try different combinations of settings and see the results. When you find the combination that works just copy and paste the generated settings directly into your *root* project config.xml. I only included a small set of colors so if you like something else you’ll need to change that hex value, but that should be fairly obvious.

The initial values for the preferences in the demo app were set to those defaults added by the StatusBar plugin so you see what you’re getting by making no change. Remember, the `StatusBarBackgroundColor` is disabled since the `StatusBarOverlaysWebView` value is true and color doesn’t apply unless it’s false.
Also, the demo doesn’t use any specific UI frameworks, it’s just a modified default Cordova Hello World.

###Customizing Programmatically

The other option for using the Status Bar plugin is to programmatically set the desired overlay and appearance of your application and show or hide it at runtime using the plugins’ API methods. These methods are pretty straightforward and documented well in the plugin readme but I just wanted to point out these programmatic options as well.

**ATTENTION IONIC USERS:** If you’re building apps with Ionic and add the StatusBar Plugin, you should be aware that all of their default templates that can be created with CLI $ ionic start include code that sets the default style (black text) programmatically upon application start in the www/js/app.js file in each project:

    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
so your `config.xml` settings will be overridden unless you remove this. You may wonder why they’re not being applied otherwise :). See [this article](http://learn.ionicframework.com/formulas/customizing-the-status-bar/) for how to programmatically customize the status bar with Ionic.

####Related Reading

+ [Apple Developer Docs – Transition from iOS6 to iOS7 Guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/TransitionGuide/index.html#//apple_ref/doc/uid/TP40013174)
+ [Apple Developer Docs – Appearance Customization](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/TransitionGuide/AppearanceCustomization.html)
+ [Ionic – Customizing the StatusBar](http://learn.ionicframework.com/formulas/customizing-the-status-bar/)
+ [Everything Hybrid Web Apps Need to Know About the Status Bar in iOS7 by TJ Van Toll](http://blogs.telerik.com/appbuilder/posts/13-11-07/everything-hybrid-web-apps-need-to-know-about-the-status-bar-in-ios7)
