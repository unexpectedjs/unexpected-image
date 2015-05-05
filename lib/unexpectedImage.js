var gm = require('gm');

module.exports = {
    name: 'unexpected-image',
    installInto: function (expect) {
        expect.addAssertion(['string', 'Buffer'], 'to have metadata satisfying', function (expect, subject) { // ...
            var extraArgs = Array.prototype.slice.call(arguments, 2);
            this.errorMode = 'nested';
            return expect.promise(function (resolve, reject) {
                gm(subject).identify(function (err, metadata) {
                    if (err) {
                        return reject(err);
                    } else {
                        return expect.promise(function () {
                            return expect.apply(expect, [metadata, 'to satisfy assertion'].concat(extraArgs));
                        }).caught(reject).then(resolve);
                    }
                });
            });
        });
    }
};