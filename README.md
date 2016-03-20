# ObjectFitCover
A polyfill for responsive background image cover with the `img` or `picture` using the responsive image spec.

## Intro
- Cover an element with an image `img`, with CSS property `object-fit`
- JS-fallback for browsers not supporting CSS property `object-fit`
- Responsive image behaviour with `img srcset`, for old browsers the polyfill [Picturefill](https://github.com/scottjehl/picturefill)

## Advantages
- Modern browsers can use `img srcset` together with CSS property `object-fit` to achieve the `background-size: cover` effect (no JS needed!)
- Works with the good old `img` tag, so no longer image-src-refences in CSS-files or custom data-attributes

## Usage

### 1. Include ObjectFitCover
Preferably inline (0.5kb gzip) in the `head` section before the stylesheets. This to have the best render performance. [Copy the source from here]()


```html
<head>
    <script>
      ..ObjectFitCover inline..
    </script>

    <link rel="stylesheet" href="yourstylesheet.css" />
</head>
```

### 2. Include [Picturefill](https://github.com/scottjehl/picturefill/)
This is a polyfill for supporting `srcset` and the `picture` element. Include it preferably async, [to avoid making it renderblocking](https://developers.google.com/speed/docs/insights/BlockingJS).
Note: if you don't need picturefill, don't include it but set `window.picturefill = {}` to make this lib work.

```html
<script src="picturefill.min.js" async></script>
```

### 3. Include your images & CSS
[See the examples]()

## Browser support
| Browser  |  polyfill needed |
|----------|-------------||
| Google Chrome | yes | v31+ |
| Opera | yes | v24+ |
| Firefox | 4+ (#13) | v36+ |

## What is not (yet) supported?
- CSS property `background-attachment: fixed`
- CSS property `object-position`

## Known issues
- Firefox: combining <code>object-fit</code> with a transition gives weird behaviour (see bug .. )

## What about?
### Supporting `object-fit: contain`?
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
### Supporting lazy responsive image loading?
You can call `objectFitCover()` anytime to fix the image-cover in non-supporting browsers. For example with [LazySizes](https://github.com/aFarkas/lazysizes):

CSS:
``` css
.no-object-fit {
    .object-fit-container {
        // The lazysizes lib ignores images with display: none, so overwrite the styling from the ObjectFitCover polyfill
        img.lazyload {
            display: block;
        }
    }
}

.lazyload {
    opacity: 0;
}

.lazyloaded {
    opacity: 1;
}
```

``` js
// fix the images just before showing them
document.addEventListener('lazybeforeunveil', function () {
    objectFitCover();
}
```
