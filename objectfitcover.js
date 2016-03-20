(function () {
  var supportsObjectFit = 'objectFit' in document.documentElement.style;
  var raf = (function () {
    return window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 10);
      };
  })();

  function addStyles() {
    var css = '.object-fit-container { position: relative; } .object-fit-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } .object-fit-container.cover img { object-fit: cover; } .object-fit-container.cover { background-position: center center; background-size: cover; background-repeat: no-repeat; } .no-object-fit .object-fit-container img { display: none; }',
      style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  }

  function setImages() {
    if (supportsObjectFit) {
      return;
    }

    raf(function () {
      var elements = document.getElementsByClassName('object-fit-container');

      for (var i = 0; i < elements.length; i++) {
        var img = elements[i].getElementsByTagName('img')[0];
        var imageSrc = img.src;

        elements[i].style.backgroundImage = 'url(' + imageSrc + ')';
      }
    });
  }

  // execute stuff
  addStyles();

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
