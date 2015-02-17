###Performance Tip: Using CSS Sprite Sheets

####Problem
Using images in your mobile applications enhances the overall look but at the same time causes them run much slower since each background image requires another HTTP request. 

####Solution
With the use of CSS Sprite Sheets you can combine an unlimited number of images into one and the server only has to send one image file containing all of your images rather than each individual one. Then you can display any segment from that file as a background to an element through CSS styling. 

To use specific segments from a CSS sprite sheet for a background image for instance, just create a new image that is as wide as your widest image and and as tall as the combined height of all your images plus X pixels, where X is the number of images you have. Then place your images into this new image, left aligned, one on top of the other with one pixel of white space in between.

###### #nav li a {background-image:url('../img/image_nav.gif')}
###### #nav li a.item1 {background-position:0px 0px}
###### #nav li a:hover.item1 {background-position:0px -72px}
###### #nav li a.item2 {background-position:0px -143px;}
###### #nav li a:hover.item2 {background-position:0px -215px;}



You can use a tool like [Sprite Cow](http://www.spritecow.com/) to help you define sprite sheets and just grab the corresponding CSS. 

