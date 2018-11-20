---
template: default.ejs
theme: dark
title: unexpected-image
repository: https://github.com/unexpectedjs/unexpected-image
---

# Unexpected-image

Image metadata plugin for the [Unexpected](https://unexpected.js.org/) assertion library (version 7+ required). Uses GraphicsMagick, which must be installed on your system.

[![NPM version](https://badge.fury.io/js/unexpected-image.svg)](http://badge.fury.io/js/unexpected-image)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-image.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-image)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-image/badge.svg)](https://coveralls.io/r/unexpectedjs/unexpected-image)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-image.svg)](https://david-dm.org/unexpectedjs/unexpected-image)

![Unexpected Image (paparazzi)](animal-paparazzi.jpg)

Images can be specified either as strings (file name or data: url) or as Buffer or Uint8Array instances.

The metadata will be extracted using `gm identify` via the [gm](http://aheckmann.github.io/gm/)
library and matched with
[to satisfy](https://unexpectedjs.github.io/assertions/any/to-satisfy/) semantics:


```js#async:true
return expect('magic-pen-6-colours.jpg', 'to have metadata satisfying', {
    format: 'JPEG',
    'Channel Depths': {
        Gray: '8 bits'
    },
    size: {
        height: 400,
        width: 200
    }
});
```

```output
expected magic-pen-6-colours.jpg (image/jpeg) to have metadata satisfying
{
  format: 'JPEG',
  'Channel Depths': { Gray: '8 bits' },
  size: { height: 400, width: 200 }
}

{
  Format: 'JPEG (Joint Photographic Experts Group JFIF format)',
  format: 'JPEG',
  Geometry: '380x248',
  size: {
    width: 380, // should equal 200
    height: 248 // should equal 400
  },
  Class: 'DirectClass',
  Type: 'true color',
  Depth: '8 bits-per-pixel component',
  depth: 8,
  'Channel Depths': {
    Red: '8 bits',
    Green: '8 bits',
    Blue: '8 bits'
    // missing Gray: '8 bits'
  },
  'Channel Statistics': {
    Red: {
      Minimum: '4626.00 (0.0706)',
      Maximum: '65535.00 (1.0000)',
      Mean: '59679.23 (0.9106)',
      'Standard Deviation': '11628.66 (0.1774)'
    },
    Green: {
      Minimum: '7710.00 (0.1176)',
      Maximum: '65535.00 (1.0000)',
      Mean: '57725.47 (0.8808)',
      'Standard Deviation': '14235.62 (0.2172)'
    },
    Blue: {
      Minimum: '0.00 (0.0000)',
      Maximum: '65535.00 (1.0000)',
      Mean: '54870.56 (0.8373)',
      'Standard Deviation': '19212.51 (0.2932)'
    }
  },
  Filesize: '10.8Ki',
  Interlace: 'No',
  Orientation: 'Unknown',
  'Background Color': 'white',
  'Border Color': '#DFDFDF',
  'Matte Color': '#BDBDBD',
  'Page geometry': '380x248+0+0',
  Compose: 'Over',
  Dispose: 'Undefined',
  Iterations: '0',
  Compression: 'JPEG',
  'JPEG-Quality': '85',
  'JPEG-Colorspace': '2',
  'JPEG-Colorspace-Name': 'RGB',
  'JPEG-Sampling-factors': '2x2,1x1,1x1',
  Signature: '5acb0f0d4e02a3b565f723d59290032e96df8c89989f41a71900741ce512beb4',
  path: 'magic-pen-6-colours.jpg'
}
```

License
-------

Unexpected-image is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
