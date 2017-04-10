(function () {
  var hasObjectFit = 'objectFit' in document.documentElement.style;

    // add a background-image fallback
  function setImages(options) {
    if (hasObjectFit) {
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

  window.objectFitCover = setImages;

  // check for object-fit support
  if(hasObjectFit) {
    return;
  }

  // create a fallback for requestAnimationFrame
  var raf = (function () {
    return window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 10);
      };
  })();

  // add class to body
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

})();
