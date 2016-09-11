This plugin for [reveal.js](https://github.com/hakimel/reveal.js/) allows the presenter to control slides with his or her voice.

#### Custom Speech Phrases

You can write define custom phrases to say to move to the next slide by applying a ```data-speech-next``` attribute to a ```<section>``` slide. Saying that attributes value will move to the next slide:

```html
<section data-speech-next="movingalong">
</section>
```

You can also reveal fragments by attaching a ```data-speech``` attribute to the fragment element. Saying that attribute value will unhide the fragment if it is the next fragment to be shown.

```html
<section>
	<h2>List of Delicious Things:</h2>
	<ol>
		<li class="fragment" data-speech="spaghetti">Spaghetti</li>
		<li class="fragment" data-speech="chicken">Chicken</li>
		<li class="fragment" data-speech="beer">Beer</li>
	</ol>
</section>
```

#### Configuration

You can customize certain configuration variables of the the ```RevealSpeech``` object using the ```configuration()``` method after loading the plugin:

```javascript
Reveal.initialize({
	dependencies: [{
		src: "plugin/speech/speech.js",
		callback: function() {
			RevealSpeech.configure({
				nextKeyword: 'nextslide', 		// default gotonext
				prevKeyword: 'previousslide', // default gotoprevious
				lastKeyword: 'lastslide', 		// default gotolast
				firstKeyword: 'firstslide', 	// default gotofirst
				debug: true 									// default false
			});
		}
	}]
});
```
