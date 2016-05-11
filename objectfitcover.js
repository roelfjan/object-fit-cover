(function () {
  // check for object-fit support
  var supportsObjectFit = 'objectFit' in document.documentElement.style;

  // create a fallback for requestAnimationFrame
  var raf = (function () {
    return window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 10);
      };
  })();

  // Add a background-image fallback
  function setImages(options) {
    if (supportsObjectFit) {
      return;
    }

    raf(function () {
      var elements = (options && options.elements) || document.getElementsByClassName('object-fit-container');

      for (var i = 0; i < elements.length; i++) {
        var img = elements[i].getElementsByTagName('img')[0];

        // get current image src: Edge only supports 'currentSrc' for getting the current image src ('src' returns value DOM value)
        var imageSrc = img.currentSrc || img.src;

        elements[i].style.backgroundImage = 'url(' + imageSrc + ')';
      }
    });
  }

  // execute stuff
  if (!supportsObjectFit) {
    document.documentElement.className += ' no-object-fit';

    // check when picturefill is loaded, execute it after picturefill
    var checkExist = setInterval(function () {
      if (window.picturefill) {
        clearInterval(checkExist);

        raf(setImages);
      }
    }, 100);

    window.addEventListener('resize', function () {
      // Picturefill v3.0.2 uses a 99ms timeout (https://github.com/scottjehl/picturefill/blob/master/src/picturefill.js#L1422), the resize event needs to be after that
      setTimeout(function () {
        setImages();
      }, 100);
    });
  }

  window.objectFitCover = setImages;
})();
