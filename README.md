images.js
=========

Javsacript class loading images by window width

## 1. Docs

___Declaration___

new Images(arguments)

___Arguments___

arguments parameter is an object.

	1. elements - element with data-images attribute
	2. prefix - path prefix
	3. events - events key is an object (start, ready)
	4. resolutions - resolution key is an object of resolution names and resolutions. only special value for resolution name is value 'auto' without units ({'default': 1900, 'small': 500...})
	5. reload - reload images on resize
	
___Methods:___

  1. init()
  
## 2. Example

``` js
    
    /* Javascript example */
		var i = new Images({
			elements: document.getElementsByTagName('img'),
			prefix: 'images/',
			reload: true,
			events: {
				start: start, 
				ready: ready
			},
			resolutions: {'default': 'auto', 'medium': 960, 'small': 640}
		});
		
		i.init();	
		
		function start () {
			document.getElementById('status').innerHTML = '<strong>Images class is initialized</strong>';
		}

		function ready () {
			document.getElementById('status').innerHTML = '<strong>Images are ready</strong>';
		}

``` 

``` html
	
	/* HTML example */
	...
	<div>
		<div id="status"></div>
		<img data-images='{"default": "img.png", "medium": "img_medium.png", "small": "img_small.png"}'>
		<img data-images='{"default": "img2.png", "medium": "img2_medium.png", "small": "img2_small.png"}'>
	</div>
	...
	
```   

