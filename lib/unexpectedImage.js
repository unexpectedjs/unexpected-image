/* global Uint8Array */
const gm = require('gm');

const contentTypeByGraphicsMagickFormat = {
  GIF: 'image/gif',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  SVG: 'image/svg+xml'
};

module.exports = {
  name: 'unexpected-image',
  version: require('../package.json').version,
  installInto(expect) {
    expect.installPlugin(require('magicpen-media'));

    expect.addAssertion(
      '<string|Buffer|Uint8Array> to have metadata satisfying <any>',
      function(expect, subject) {
        // ...
        const extraArgs = Array.prototype.slice.call(arguments, 2);
        this.errorMode = 'nested';

        if (typeof subject === 'string') {
          const matchDataUrl = subject.match(/^data:[^;]*;base64,(.*)$/);
          if (matchDataUrl) {
            subject = Buffer.from(matchDataUrl[1], 'base64');
          }
        } else if (subject instanceof Uint8Array) {
          subject = Buffer.from(subject);
        }

        const that = this;

        return expect.promise((resolve, reject) => {
          gm(subject).identify((err, metadata) => {
            if (err) {
              return reject(err);
            } else {
              delete metadata['Elapsed Time'];
              delete metadata['Pixels Per Second'];
              delete metadata.Tainted;
              const contentType =
                contentTypeByGraphicsMagickFormat[metadata.format];
              if (contentType) {
                that.subjectOutput = function() {
                  this.image(subject, {
                    contentType,
                    width: 10,
                    height: 5,
                    link: true
                  });
                };
              }

              return expect
                .promise(() => {
                  that.errorMode = 'default';
                  return expect.apply(
                    expect,
                    [metadata, 'to satisfy assertion'].concat(extraArgs)
                  );
                })
                .caught(reject)
                .then(resolve);
            }
          });
        });
      }
    );
  }
};
