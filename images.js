/*
---
Images.js: JavaScript class
---
*/

/*
Declaration
-----------

new Images(arguments);

Arguments
---------

arguments parameter is an object

1. elements 		- element with data-images attribute
2. prefix				- path prefix
3. events				- events key is an object (start, ready)
4. resolutions 	- resolution key is an object of resolution names and resolutions.
									only special value for resolution name is value 'auto'
									without units ({'default': 1900, 'small': 500...})
5. reload				- reload images on resize

##

waitForFinalEvents is solution by "brahn" (http://stackoverflow.com/users/239712/brahn)

*/

function Images(arguments) {
	waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
	    if (!uniqueId) {
	      uniqueId = "Don't call this twice without a uniqueId";
	    }
	    if (timers[uniqueId]) {
	      clearTimeout (timers[uniqueId]);
	    }
	    timers[uniqueId] = setTimeout(callback, ms);
	  };
	})();

	if (typeof arguments === 'undefined' || typeof arguments !== 'object') {
		console.warn('No arguments specified');
		return false;
	}
	
	if (typeof arguments.elements === 'undefined') {
		console.warn('No elements specified');
		return false;		
	}
	
	if (typeof arguments.prefix === 'undefined') {
		arguments['prefix'] = '';
	}
	
	if (typeof arguments.reload === 'undefined') {
		arguments['reload'] = false;
	}
	
	this.elements  		= arguments.elements;
	this.prefix				= arguments.prefix;
	this.events 			= arguments.events;
	this.resolutions 	= arguments.resolutions;
	this.reload				= arguments.reload;
} 

Images.prototype = {
	init: function () {
		if (typeof this.events.start !== 'undefined') {
			this.events.start();
		}
		var category = this.getImageCategory();
		for (key in this.elements) {
		  if (parseInt(key) >= 0) {
				var img = this.elements[parseInt(key)].getAttribute('data-images');
				if (this.elements[parseInt(key)].getAttribute('src') != this.prefix + JSON.parse(img)[category]) {
					this.elements[parseInt(key)].setAttribute('src', this.prefix + JSON.parse(img)[category]);
				}
			}
		}	
		if (typeof this.events.ready !== 'undefined') {
			this.events.ready();
		}
		var t = this;
		if (this.reload) {
			window.onresize = function () {
				waitForFinalEvent(function(){
					t.init();
				}, 500, "__resize__");			
			}
		}
	},
			
	getResolution: function () {
		return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)	
	},
	
	getImageCategory: function () {
		var resolution = this.getResolution();
		var name = '';
		for (key in this.resolutions) {
			if (this.resolutions[key] === 'auto') { this.resolutions[key] = 9999999; }
			if (parseInt(this.resolutions[key]) >= parseInt(resolution)) {
				name = key;
			}		
		}
		return name;
	}
}