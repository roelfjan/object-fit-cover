# ObjectFitCover
A polyfill for the background-image cover effect combined with responsive image behaviour with the `<img>` or `<picture>` element.

## Intro
Covering an area with an image can be achieved with `background-size: cover`, but adding responsive image behaviour can be a pain with custom data-attributes or image-source references in CSS.

The cover effect together with responsive image behaviour can be achieved native in modern browsers (no javascript needed!) with the [CSS property `object-fit`](https://developer.mozilla.org/nl/docs/Web/CSS/object-fit) ([support](http://caniuse.com/#search=object-fit)) combined with the `<img> (with srcset)` ([support](http://caniuse.com/#search=srcset)) or `<picture>` ([support](http://caniuse.com/#search=picture)) element.
ObjectFitCover adds a background-image fallback for browsers not supporting CSS property `object-fit: cover`. This polyfill works together with [Picturefill](https://github.com/scottjehl/picturefill), a polyfill for responsive image behaviour with `<picture>`, srcset, sizes and more.

## Usage

### 1. Include ObjectFitCover
Preferably inline (1.23kb, 0.6kb gzipped) in the `head` section before the stylesheets. This to avoid flashes and have the best render performance. [Copy the source from here]()


```html
<head>
    <script>
      ..ObjectFitCover inline..
    </script>

    <link rel="stylesheet" href="yourstylesheet.css" />
</head>
```

### 2. Include [Picturefill](https://github.com/scottjehl/picturefill/)
Preferably async, [to avoid making it renderblocking](https://developers.google.com/speed/docs/insights/BlockingJS).

```html
<script src="picturefill.min.js" async></script>
```
Note: if you don't need picturefill, set `window.picturefill = {}` to make this polyfill work.

### 3. Include your images & CSS
```css
.example {
    width: 100px;
    height: 300px;
}
```

```html
<div class="object-fit-container cover example">
    <img src="fallback.jpg" srcset="image@1x 1x, image@2x 2x" />
</div>
```
[See the examples](http://roelfjan.github.io/object-fit-cover/)

## Browser support
`object-fit: cover` is supported in below browsers, so ObjectFitCover is not needed for these:
- Chrome > 30
- Safari > 7
- Firefox > 35
- Android Browser > 4.4
- Opera > 18

ObjectFitCover works in:
- Chrome
- Safari > 3
- Internet Explorer > 8
- Edge
- Firefox > 4
- Android Browser > 2.3
- Opera > 10.1

## What is not (yet) supported?
- CSS property `background-attachment: fixed`
- CSS property `object-position`
- Video's

## What about?
- **Supporting all possible values of the CSS property `object-fit`?**
  This polyfill can be small in size because of not supporting all possible values. The cover-effect is an often used effect on sites. It's not needed for those cases to load a complete polyfill for all possible (unused) values.

- **Supporting `object-fit: contain`?**
  You can add this CSS to make it work as well:
  ```css
  .object-fit-container.contain {
      background-repeat: no-repeat;
      background-size: contain;
  }
  .object-fit-container.contain img {
      object-fit: contain;
  }
```
- **Supporting lazy responsive image loading?**
  You can call `objectFitCover()` anytime to fix the image-cover in non-supporting browsers. For example with [LazySizes](https://github.com/aFarkas/lazysizes):

  ``` js
  // fix the images just before showing them
  document.addEventListener('lazybeforeunveil', function () {
      objectFitCover();
  }
```
