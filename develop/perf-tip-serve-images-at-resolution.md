###Performance Tip: Serve Images at Desired Resolution

####Problem: 
Browsers have limited cache for resized images. Once full, scrolling up and down where old (no longer cached) images were used will cause them to have to be resized again on the fly resulting in a choppy experience.

####Solution:
Serve images at the resolution you want them to be displayed.

Browsers have a limited cache for resized images. Once that cache fills up, older images get evacuated from the cache. This means that, as the user scrolls up and down the page, they will constantly run into images that are not in the cache. These images will have to be decoded and resized again on the fly.

The way it works is this. The browser decodes the image from whatever format it's in (jpeg, png, whatever), into a bitmap, which it then resizes and caches.

This resize will cause one of two things: either it will cause your scrolling to jank, or it'll cause the scrollable area on your mobile site to be white while the mobile browser draws the image in the background. This isn't ideal, and will result in your users not being able to see what they're scrolling through since it can't be loaded fast enough. The solution is to serve and download images at the resolution they'll be displayed.