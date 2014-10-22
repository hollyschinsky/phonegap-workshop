---
layout: module
title: Module 1&#58; Styling, Status Bar, Icons and Configuration Tips
---
This module is going to take you through a couple steps to polish the application a bit more. 

###Styling
1. Open the styles.css and add the following to the bottom to style the header bar and icons:

```
.media>p {
    color: #444;
}
.bar-nav {
    background-color: #209dc2;
    color: #ffffff;
}
.title {
    color: #ffffff;
}
.bar-nav .icon {
    color: #ffffff;
}
.bar-header-secondary {
    background-color: #eeeeee;
}
```

1. Test the application.

    ![](images/statusbar1.png)

#### It looks better, but you may notice the status bar header seems to overlap the space where the application header resides. The next step will address this.

###Status Bar Handling

![](images/statusbar1.png)

In iOS7, the status bar overlaps the application views. As a result, the status bar text may collide with the 
application's header text as shown in the screenshot above. You can fix this issue using the [statusbar plugin](https://github.com/apache/cordova-plugin-statusbar). 

1. Add the status bar plugin:

    ```
    phonegap plugins add org.apache.cordova.statusbar
    ```

There are two options for fixing this issue, via configuration or programmatically. Choose to implement one of the options below:

1. Configuration (config.xml):
   
   For this particular application, we're going to go through the exercise of changing it using the config.xml so the status bar is no longer
   overlaying the content. We'll also set the text and icons to white and the background color to match the header we currently have.   
   
   Open the config.xml file and add the following lines to the end of the preferences:
   
   ```
   <preference name="StatusBarOverlaysWebView" value="false" />
   <preference name="StatusBarBackgroundColor" value="#209dc2"/>
   <preference name="StatusBarStyle" value="lightcontent" />
       
    ```

1.Programatically:
  In app.js, add the following code at the top of the **deviceready** handler:

    ```
    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByHexString('#209dc2');
    StatusBar.styleLightContent();
    ```

Now build the application again and test your application in the iOS emulator or on an iOS device.

![](images/statusbar1.png)
    
    
###Keyboard Accessory Bar 

To suppress the accessory keyboard that pops up with the **Done** button on it, we can  
use a custom plugin from the Ionic Framework and then use a method to hide it:


1. Add the Ionic Keyboard Plugin:

  ```  
  phonegap plugin add https://github.com/driftyco/ionic-plugins-keyboard
  ```
  
2.  In app.js, add the following code at the top of the **deviceready** handler:

```
    if (cordova.plugins.Keyboard)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
```            

