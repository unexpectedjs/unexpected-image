Asserts that an image has metadata that [satisfies](http://unexpected.js.org/assertions/any/to-satisfy/) a given spec.

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
expected image/jpeg:magic-pen-6-colours.jpg to have metadata satisfying
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
    Blue: '8 bits',
    Gray: undefined // should equal '8 bits'
  },
  'Channel Statistics': { Red: ..., Green: ..., Blue: ... },
  Filesize: '13.2K',
  Interlace: 'No',
  Orientation: 'TopLeft',
  'Background Color': 'white',
  'Border Color': '#DFDFDF',
  'Matte Color': '#BDBDBD',
  Compose: 'Over',
  Dispose: 'Undefined',
  Iterations: '0',
  Compression: 'JPEG',
  'JPEG-Quality': '85',
  'JPEG-Colorspace': '2',
  'JPEG-Colorspace-Name': 'RGB',
  'JPEG-Sampling-factors': '2x2,1x1,1x1',
  Signature: '5acb0f0d4e02a3b565f723d59290032e96df8c89989f41a71900741ce512beb4',
  'Profile-EXIF': {
    Orientation: '1', 'X Resolution': '72', 'Y Resolution': '72',
    'Resolution Unit': '2', 'Date Time': '2014:07:13 16:21:04',
    'Y Cb Cr Positioning': '1', 'Exif Offset': '144', 'Exif Version': '0221',
    'Components Configuration': '\\001\\002\\003\\000',
    'Flash Pix Version': '0100', 'Color Space': '1', 'Exif Image Width': '380',
    'Exif Image Length': '248'
  },
  path: 'magic-pen-6-colours.jpg'
}
```

License
-------

Unexpected-image is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
