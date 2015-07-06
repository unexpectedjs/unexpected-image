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

    it('should support identifying an image given by a data: url', function () {
        return expect(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAA81JREFUOMttlF1Mm2UUx8/z8faTbqXty9pKKYU4YINF0S7EjZlF6Qg4gplEozNL2HRmJur02kTnx/WM0ahbdmP0xksdFuYNc6CDjc1OcHxtiLSFttC1peV92+fDi27oEs7VOcn/9z85yTmHSilhqxBCCCEQAMIYY7ylhv6/kEIgjAFASokfMFJKKSVCqNwGIbQFLKVEGG8qotHohfPnk8nU6ffeDQQCQohNr03+P5gxlkwmVVVVFGVycrL3cM9yPF7U9VuRyMBg2Gw2x+Nxzli1z/dQ57LrmQ8+/PzsZ2c++fitd94eHR1VDIbnenr8tbXhgYFIJGKvrOw/dkxw0X/8+GsnXy8jtDxeOn1vQ9NOvnkqmUrldd79fB+SknFGCHnl6MuNe1rDAz891X7A7fH8E4ttTk6FEISQmbk7t27eCHWGwj8PLizF6up9TfufHRm6SAg8feQoMSp7g3sLyaV8YaO36xAHYFwohFCNSSShyutteaYnzXmwq8/lclyaXj09rH3a3MqQciScudBpkgbHdXOzgSc2RMCXL5kI4oLTIpeMFSeujV2ueHJGMx+y56bHf/06EYiu5r63O3Quomv57/5ILKfXB+M2h9m+Fp5v3A4H612FIqeSKhO/jXg9nj0Gz/iVxY7Q7unU4mwiU1tpmkysI4AdFcrEUqbdXnBZHCUBT2zT2fz1jL8TcU5zBc3rr5emivGJeWoiIwtrKd3W3UgvR/W8MAkJKhIBhV3R3Qrl2Q2u+mpkKZJIJFwuF91g3Ol0fnE1FlnRbWblh9u5/hb74V1VU7O/r9yewYR6PWpv1/6xhdTNb89a1tLeA+07T53gmlYscQoSCloJYRR0MJsJreu8QTUbrdam1WvRoXPbnapF3VF3otdNtT9jUzWUanduEItVMME4p1zIbJH1tahtbIZZnCKfw3ZLLKtniwLbHGZPXXp1ZTmTL+mATNZt7uq8putM6CWGsULdFQYJMq2L5ay2r9E9PBZ/zAx11cYJo7Qa6KN+79W7f7V5LVPJ2VQsGgwGhy7+aC6sVldVguDUYTEgBOslzVG/u6nGPXev2W7EVQhsFIwKbajx/JLN+C1oNpfo7Ox49aUX8mtJbWXJ5VWFwBQQSAC/3VT7eEBK6G7xYYQWs/qX0Nb6YtAffGTubvVHw3+/Hwod7OjACH117hsAkAAIY1q+LgkghMQYCQGAwG1Vht7Y57QaHEY01bCzkgoAKYUAjLkQGOP7u10+LgSAMAIAghEAGAje5TSWbZvs9zWUEAAghGz9SR56Q1IiQAihB8kWmn8BP7bYfD0WnAsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDYtMjVUMjI6NDk6MzcrMDI6MDAuljaFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA0LTA2VDIzOjM2OjA2KzAyOjAw+9U3IQAAABF0RVh0anBlZzpjb2xvcnNwYWNlADIsdVWfAAAAIHRFWHRqcGVnOnNhbXBsaW5nLWZhY3RvcgAxeDEsMXgxLDF4MemV/HAAAAAASUVORK5CYII=',
            'to have metadata satisfying', {
                format: 'PNG',
                Geometry: '20x20'
            }
        );
    });
});
