/*global describe, it*/
var unexpected = require('unexpected'),
    pathModule = require('path'),
    fs = require('fs');

describe('unexpected-image', function () {
    var expect = unexpected.clone()
        .installPlugin(require('../lib/unexpectedImage'));

    var turtleJpegPath = pathModule.resolve(__dirname, '..', 'testdata', 'turtle.jpg'),
        turtleJpeg = fs.readFileSync(turtleJpegPath);

    describe('with an image provided as a Buffer instance', function () {
        it('should succeed', function () {
            return expect(turtleJpeg, 'to have metadata satisfying', {
                format: 'JPEG',
                size: {
                    width: 481
                }
            });
        });

        it('should fail with a diff', function () {
            return expect(
                expect(turtleJpeg, 'to have metadata satisfying', {
                    format: 'JPEG',
                    size: {
                        width: 481,
                        height: 426
                    },
                    Interlace: 'Yes',
                    Resolution: '96x96 pixels/inch'
                }),
                'when rejected',
                'to have message',
                    /height: 424 \/\/ should equal 426/
            );
        });
    });

    describe('with an image provided as a file name', function () {
        it('should succeed', function () {
            return expect(turtleJpegPath, 'to have metadata satisfying', {
                format: 'JPEG',
                size: {
                    width: 481
                }
            });
        });

        it('should fail with a diff', function () {
            return expect(
                expect(turtleJpegPath, 'to have metadata satisfying', {
                    format: 'JPEG',
                    size: {
                        width: 481,
                        height: 426
                    },
                    Interlace: 'Yes',
                    Resolution: '96x96 pixels/inch'
                }),
                'when rejected',
                'to have message',
                    /height: 424 \/\/ should equal 426/
            );
        });
    });

    it('should identify an image despite of a wrong extension', function () {
        return expect(pathModule.resolve(__dirname, '..', 'testdata', 'reallyapng.jpg'), 'to have metadata satisfying', {
            format: 'PNG'
        });
    });

    it('should fail with an error message if the file type is unsupported', function () {
        return expect(
            expect(pathModule.resolve(__dirname, '..', 'testdata', 'foo.data'), 'to have metadata satisfying', {
                format: 'PNG'
            }),
            'to be rejected with', /gm identify: No decode delegate for this image format/
        );
    });
});
