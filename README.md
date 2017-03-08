This plugin for [reveal.js](https://github.com/hakimel/reveal.js/) allows the presenter to control slides with his or her voice. Check out the [demo](http://mattschmoyer.com/projects/speech-presentation/).

#### How To Use
Copy ```speech.js``` from this repository into ```/plugin/speech``` and add it as a Reveal.js dependency:

```javascript
Reveal.initialize({
  dependencies: [{src: "plugin/speech/speech.js" }]
});
```

#### Built-In phrases
There are a few default phrases you can say to control slide navigation:

* "Goto Next" - Next slide
* "Goto Previous" - Previous slide
* "Goto Last" - Moves to the last slide of the presentation
* "Goto First" - First slide of the presentation

These can also be [modified](#configuration).

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
        nextKeyword: 'nextslide',     // default gotonext
        prevKeyword: 'previousslide', // default gotoprevious
        lastKeyword: 'lastslide',     // default gotolast
        firstKeyword: 'firstslide',   // default gotofirst
        debug: true,                  // default false
        lang: 'de-DE'                 // default '' (Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang)
      });
    }
  }]
});
```

#### Browser Support

As of 2016-09-11, speech recognition interfaces are only supported in Chrome 33+ and Firefox 49+. Check [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility) for more detail on browser capability.
