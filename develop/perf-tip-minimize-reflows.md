###Performance Tip: Animate Wisely to Minimize Reflows

####Problem:
Animating properties that cause a change to visibility (width/height, color, outline) or layout will trigger a reflow or repaint, which is too expensive in terms of performance for mobile browsers to handle.

####Solution: 
Stick to animating `transform` and `opacity` properties only until mobile web browsers are more optimized and can support more frames per second. 

A **reflow** computes the layout of the page.  A reflow on an element recomputes the dimensions and position of the element, and it also triggers further reflows on that element’s children, ancestors and elements that appear after it in the DOM.  Then it calls a final repaint.  Reflowing is very expensive, but unfortunately it can be triggered easily.

A repaint occurs when changes are made to an elements skin that changes visibility, but do not affect its layout. Examples of this include outline, visibility, or background color. Repaint is expensive because the browser must verify the visibility of all other nodes in the DOM tree. A reflow is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page). Reflow of an element causes the subsequent reflow of all child and ancestor elements as well as any elements following it in the DOM.

`Source credit: http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/`

For example:

	<body>
		<div class=”error”>
			<h4>My Module</h4>
			<p><strong>Error:</strong>Description of the error…</p>
			<h5>Corrective action required:</h5>
			<ol>
				<li>Step one</li>
				<li>Step two</li>
			</ol>
		</div>
	</body>

In the HTML snippet above, a reflow on the paragraph would trigger a reflow of the `strong` because it is a child node. It would also cause a reflow of the ancestors (div.error and body – depending on the browser). In addition, the `h5` and `ol` would be reflowed simply because they follow that element in the DOM. 

Reflows are expensive and are one of the main causes of slow DOM scripts, particularly on devices with low processing power, such as phones. In many cases, they are equivalent to laying out the entire page again.

###What causes a reflow?
+ Resizing the window
+ Changing the font
+ Adding or removing a stylesheet
+ Content changes, such as a user typing text in
an input box
+ Activation of CSS pseudo classes such as `:hover` (in IE the activation of the pseudo class of a sibling)
+ Manipulating the class attribute
+ A script manipulating the DOM
+ Calculating `offsetWidth` and `offsetHeight`
+ Setting a property of the style attribute

###6 Best Practices to minimize reflows

`Source credit: http://blog.letitialew.com/post/30425074101/repaints-and-reflows-manipulating-the-dom-responsibly`

1. Avoid setting multiple inline styles; avoid setting styles individually.  These trigger a reflow for each dynamic style change.

2. Use classNames of elements, and do so as low in the DOM tree as possible.  
Changing the class attribute lets you apply multiple styles to an element with a single reflow.  But since this reflows all the element’s children, that means you don’t want to change the class on a wrapper div if you’re only targeting its first child.

3. Batch your DOM changes and perform them “offline” (e.g. detach, perform your DOM changes and then re-append).

4. Avoid computing styles too often.  If you must then cache those values.  

5. Apply animations with `position: fixed or absolute` so it doesn’t affect the layout of other elements.

6. Avoid table layouts, they trigger more reflows than block layouts because multiple passes must be made over the elements.

