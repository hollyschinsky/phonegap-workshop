###Developing a Mobile App: Scrolling Tips

Pull-to-refresh is a standard UI pattern to refresh lists in mobile applications and can be implemented in your PhoneGap / Cordova applications as well.

####iScroll Approach
One option you can use to implement this pattern is the iScroll JavaScript library. It has pull-to-refresh built-in and is a great option for older OS versions or platforms that don’t support touch-based scrolling natively. But on platforms that support it (with `-webkit-overflow-scrolling: touch`), you don’t want to give up the benefits of native scrolling just to implement pull-to-refresh.

To use iScroll, do the following:

1) Add a script tag to include the iscroll.js library:


	<script src="lib/iscroll.js"></script>

2) Instantiate an `iScroll` object to scroll a list

	
	this.findByName = function() {
    	store.findByName($('.key').val(), function(items) {
        	$('.myList').html(HomeView.liTemplate(items));
	        if (self.iscroll) {
    	        console.log('Refresh iScroll');
        	    self.iscroll.refresh();
	        } else {
    	        console.log('New iScroll');
        	    self.iscroll = new iScroll($('.scroll', self.el)[0], 				{hScrollbar: false, vScrollbar: false });
        	}
    	});
	};


More information on iScroll is available [here](http://cubiq.org/iscroll-4).

###Native Scrolling Approach

Add a `div` wrapper with a scroll class around the `ul` element with a scroll:

	<script id="home-tpl" type="text/x-handlebars-template">
		<div class='header'><h1>Home</h1></div>
		<div class='search-bar'><input class='search-key' type="search"/></div>
		<div class="scroll"><ul class='employee-list'></ul></div>
	</script>


Add the following class definition your css:

	.scroll {
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		position: absolute;
		top: 84px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}







