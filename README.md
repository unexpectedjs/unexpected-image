unexpected-image
================

Image metadata plugin for the [Unexpected](https://unexpectedjs.github.io/) assertion library (version 7+ required). Uses GraphicsMagick, which must be installed on your system.

[![NPM version](https://badge.fury.io/js/unexpected-image.svg)](http://badge.fury.io/js/unexpected-image)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-image.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-image)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-image/badge.svg)](https://coveralls.io/r/unexpectedjs/unexpected-image)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-image.svg)](https://david-dm.org/unexpectedjs/unexpected-image)

Images can be specified either as strings (file name) or as Buffer instances.

The metadata will be extracted using `gm identify` via the [gm](http://aheckmann.github.io/gm/)
library and matched with
[to satisfy](https://unexpectedjs.github.io/assertions/any/to-satisfy/) semantics:


```js
it('should be grayscale and have the correct dimensions', function () {
    return expect('foo.jpg', 'to have metadata satisfying', {
        format: 'JPG',
        'Channel Depths': {
            Gray: '8 bits'
        },
        size: {
            height: 400,
            width: 200
        }
    });
});
```

Here's an example of the quite verbose image metadata format output by gm (from a 100x100 24bit PNG):

```js
{
  Format: 'PNG (Portable Network Graphics)',
  format: 'PNG',
  Geometry: '100x100',
  size: {
    width: 100,
    height: 100
  },
  Class: 'DirectClass',
  Type: 'true color with transparency',
  Depth: '8 bits-per-pixel component',
  depth: 8,
  'Channel Depths': { Red: '8 bits', Green: '8 bits', Blue: '8 bits', Opacity: '8 bits' },
  'Channel Statistics': { Red: ..., Green: ..., Blue: ..., Opacity: ... },
  Opacity: '(  0,  0,  0,255)\t  #000000FF',
  'Rendering-Intent': 'saturation',
  Gamma: '0.45455',
  Chromaticity: { 'red primary': '(0.64,0.33)', 'green primary': '(0.3,0.6)', 'blue primary': '(0.15,0.06)', 'white point': '(0.3127,0.329)' },
  Filesize: '5.2K',
  Interlace: 'No',
  Orientation: 'Unknown',
  'Background Color': 'white',
  'Border Color': '#DFDFDF00',
  'Matte Color': '#BDBDBD00',
  Compose: 'Over',
  Dispose: 'Undefined',
  Iterations: '0',
  Compression: 'Zip',
  'Png:IHDR.color-type-orig': '3',
  'Png:IHDR.bit-depth-orig': '8',
  Signature: '2b61bcc75b7a3c5df4b439d52a9415888fb9c795f86b134f218481ef470885ee',
  Tainted: 'False',
  path: 'hello.jpg'
}
```

License
-------

Unexpected-image is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
