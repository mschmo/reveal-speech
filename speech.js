var RevealSpeech = (function() {

  if (!('webkitSpeechRecognition' in window)) {
    console.log('Browser must support webkitSpeechRecognition to use this plugin.');
    return;
  }

  var config = {
    nextKeyword: 'gotonext',
    prevKeyword: 'gotoprevious',
    lastKeyword: 'gotolast',
    firstKeyword: 'gotofirst',
    debug: false,
    lang: ''
  };

  function configure(options) {
    for (var key in options) {
      if (Object.keys(config).indexOf(key) === -1) {
        continue;
      }
      config[key] = options[key];
    }
  }

  var fragmentSpeech = {};
  var fragmentIndex = 0;
  var customNextSlidePhrase = null;

  String.prototype.contains = function(search) {
    return this.indexOf(search) !== -1;
  };

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = config.lang;

  Reveal.addEventListener('slidechanged', function(event) {
    fragmentIndex = 0;
    fragmentSpeech = {};
    if (!Reveal.isLastSlide()) {
      customNextSlidePhrase = event.currentSlide.getAttribute('data-speech-next');
    } else {
      customNextSlidePhrase = null;
    }
    var fragments = [].slice.call(event.currentSlide.getElementsByClassName('fragment')).filter(function(fragment) {
      return fragment.getAttribute('data-speech') !== null;
    });
    if (fragments.length === 0) {
      return;
    }
    var fragment;
    for (var i = 0; i < fragments.length; i++) {
      fragment = fragments[i];
      fragmentSpeech[fragment.getAttribute('data-fragment-index')] = fragment.getAttribute('data-speech').toLowerCase();
    }
    if (config.debug) {
      console.log(customNextSlidePhrase);
      console.log(fragmentSpeech);
    }
  });

  Reveal.addEventListener('fragmentshown', function() {
    fragmentIndex++;
  });

  Reveal.addEventListener('fragmenthidden', function() {
    fragmentIndex--;
  });

  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        handleTranscript(event.results[i][0].transcript);
      }
    }
  };

  function handleTranscript(transcript) {
    transcript = transcript.toLowerCase().split(' ').join('');
    if (transcript.contains(config.nextKeyword) || (customNextSlidePhrase !== null && transcript.contains(customNextSlidePhrase))) {
      Reveal.next();
    } else if (transcript.contains(config.prevKeyword)) {
      Reveal.prev();
    } else if (transcript.contains(config.lastKeyword)) {
      Reveal.slide(Reveal.getTotalSlides() - Reveal.getIndices().h);
    } else if (transcript.contains(config.firstKeyword)) {
      Reveal.slide(0);
    }
    // TODO - goto specific slide number

    if (Object.keys(fragmentSpeech).length > 0 && transcript.contains(fragmentSpeech[fragmentIndex])) {
      Reveal.nextFragment();
    }

    if (config.debug) {
      console.log(transcript);
    }
  }

  recognition.start();

  return {
    configure: configure
  };

})();
