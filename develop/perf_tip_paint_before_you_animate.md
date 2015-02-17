###Performance Tip: Paint before you animate

####Problem: 
Animations can compete with repaints, including those caused by loading a new view template. This could occur when a view template is being rendered (repaint occuring) and a slide animation occurring at the same time. in, 

####Solution:
Defer the animation until after you've painted. First, append your new view to the DOM, but make sure it's off the screen or transparent. Then, in a requestAnimationFrame call, do your animation. That's it! The requestAnimationFrame callback won't be called until the paint is done, and we're ready to animate.

**Aka: Load/render template to be offscreen or transparent then use `requestAnimationFrame` to cause any animation to occur after paint is done.**  


Like we said previously, one of the keys to fast animations is to ensure that your animations aren't competing with repaints. Repaints not caused directly by your animation are just as bad.

Let's say a user clicks a button to go to another page. If we render (handlebars, react, angular, etc) the page and then immediately animate it in, the painting and the animating will happen concurently, and it'll jank. The solution is to defer the animation until after you've painted. 

Luckily this is really easy to do. First, append your new view to the DOM, but make sure it's off the screen or transparent. Then, in a requestAnimationFrame call, do your animation. That's it! The requestAnimationFrame callback won't be called until the paint is done, and we're ready to animate.

Caveat: if you're rendering a large page, your animation won't jank, but it may a long wait before the animation runs. This is just because painting a lot of content takes a long time. Generally when this is the case, try to just paint everything "above the fold" before you animate the view in, and then start painting everything else in asyncronously once it's loaded.