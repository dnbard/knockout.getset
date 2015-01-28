var expect = (require('chai')).expect,
    koGS = require('../ko.getset'),
    ko = require('knockout');

describe('Knockout GetSet', function(){
    describe('module', function(){
        it('should export an object', function(){
            expect(koGS).to.be.an('object');
        });

        it('should export #gsObservable', function(){
            expect(koGS.gsObservable).to.be.a('function');
        });

        it('should export #gsComputed', function(){
            expect(koGS.gsComputed).to.be.a('function');
        });

        it('should export #gsObservableArray', function(){
            expect(koGS.gsObservableArray).to.be.a('function');
        });
    });

    describe('#gsObservable', function(){
        it('should throw an error on invalid "object" argument', function(){
            expect(koGS.gsObservable).to.throw('Invalid argument: parent object must be set');
        });

        it('should throw an error on invalid "key" argument', function(){
            expect(function(){
                koGS.gsObservable({});
            }).to.throw('Invalid argument: property key must be a string');
        });

        it('should throw an error on already defined key', function(){
            expect(function(){
                koGS.gsObservable({ key: 1 }, 'key');
            }).to.throw(/Invalid argument: key/);
        });

        it('should return an observable', function(){
            var observable = koGS.gsObservable({}, 'property');
            expect(ko.isObservable(observable)).to.be.true;
        });

        it('should be able to write values to it', function () {
            var instance = {};

            koGS.gsObservable(instance, 'property');
            instance.property = 123;
        });
    });

    describe('#gsComputed', function(){
        it('should throw an error on invalid "object" argument', function(){
            expect(koGS.gsComputed).to.throw('Invalid argument: parent object must be set');
        });

        it('should throw an error on invalid "key" argument', function(){
            expect(function(){
                koGS.gsComputed({});
            }).to.throw('Invalid argument: property key must be a string');
        });

        it('should throw an error on already defined key', function(){
            expect(function(){
                koGS.gsComputed({ key: 1 }, 'key');
            }).to.throw(/Invalid argument: key/);
        });

        it('should throw an error on invalid "handler" argument', function(){
            expect(function(){
                koGS.gsComputed({}, 'key');
            }).to.throw('Invalid argument: computed handler must be a function');
        });

        it('should return an computed', function(){
            var computed = koGS.gsComputed({}, 'property', function(){ return 5; });
            expect(ko.isComputed(computed)).to.be.true;
        });
    });

    describe('#gsObservableArray', function(){
        it('should throw an error on invalid "object" argument', function(){
            expect(koGS.gsObservableArray).to.throw('Invalid argument: parent object must be set');
        });

        it('should throw an error on invalid "key" argument', function(){
            expect(function(){
                koGS.gsObservableArray({});
            }).to.throw('Invalid argument: property key must be a string');
        });

        it('should throw an error on already defined key', function(){
            expect(function(){
                koGS.gsObservableArray({ key: 1 }, 'key');
            }).to.throw(/Invalid argument: key/);
        });

        it('should return an observable array', function(){
            var observableArray = koGS.gsObservableArray({}, 'property');
            expect(ko.isObservable(observableArray)).to.be.true;
        });
    });
});
