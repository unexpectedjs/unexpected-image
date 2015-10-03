/*global Uint8Array*/
var gm = require('gm');

var contentTypeByGraphicsMagickFormat = {
    GIF: 'image/gif',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    SVG: 'image/svg+xml'
};

module.exports = {
    name: 'unexpected-image',
    version: require('../package.json').version,
    installInto: function (expect) {
        expect.installPlugin(require('magicpen-media'));

        expect.addAssertion('<string|Buffer|Uint8Array> to have metadata satisfying <any>', function (expect, subject) { // ...
            var extraArgs = Array.prototype.slice.call(arguments, 2);
            this.errorMode = 'nested';

            var subjectUrl;

            if (typeof subject === 'string') {
                subjectUrl = subject;
                var matchDataUrl = subject.match(/^data:[^;]*;base64,(.*)$/);
                if (matchDataUrl) {
                    subject = new Buffer(matchDataUrl[1], 'base64');
                }
            } else if (subject instanceof Uint8Array) {
                subject = new Buffer(subject);
            }

            var that = this;

            return expect.promise(function (resolve, reject) {
                gm(subject).identify(function (err, metadata) {
                    if (err) {
                        return reject(err);
                    } else {
                        delete metadata['Elapsed Time'];
                        delete metadata['Pixels Per Second'];
                        delete metadata['Tainted'];
                        var contentType = contentTypeByGraphicsMagickFormat[metadata.format];
                        if (contentType) {
                            that.subjectOutput = function () {
                                this.image(subject, { contentType: contentType, width: 10, height: 5, link: true });
                            };
                        }

                        return expect.promise(function () {
                            that.errorMode = 'default';
                            return expect.apply(expect, [metadata, 'to satisfy assertion'].concat(extraArgs));
                        }).caught(reject).then(resolve);
                    }
                });
            });
        });
    }
};
