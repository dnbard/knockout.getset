(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object
        factory(ko, ko);
    }
}(function (ko, exports) {
    function gsObservable(object, key, initValue){
        initValue = initValue === 'undefined' ? null : initValue;

        if (typeof object !== 'object'){
            throw new Error('Invalid argument: parent object must be set');
        }

        if (typeof key !== 'string' || key.length === 0){
            throw new Error('Invalid argument: property key must be a string');
        }

        if (object[key]){
            throw new Error('Invalid argument: key ' + key + ' already set');
        }

        var kovar = ko.observable(initValue);

        Object.defineProperty(object, key, {
            get: function(){
                return kovar();
            },
            set: function(val){
                kovar(val);
            },
            enumerable: true
        });

        return kovar;
    }

    function gsComputed(object, key, handler, context){
        var kovar;

        if (typeof object !== 'object'){
            throw new Error('Invalid argument: parent object must be set');
        }

        if (typeof key !== 'string' || key.length === 0){
            throw new Error('Invalid argument: property key must be a string');
        }

        if (object[key]){
            throw new Error('Invalid argument: key ' + key + ' already set');
        }

        if (typeof handler !== 'function'){
            throw new Error('Invalid argument: computed handler must be a function');
        }

        if (context){
            kovar = ko.computed(handler, context);
        } else {
            kovar = ko.computed(handler, object);
        }

        Object.defineProperty(object, key, {
            get: function(){
                return kovar();
            },
            enumerable: true
        });

        return kovar;
    }

    function gsObservableArray(object, key, initValue){
        initValue = initValue === 'undefined' ? [] : initValue;

        if (typeof object !== 'object'){
            throw new Error('Invalid argument: parent object must be set');
        }

        if (typeof key !== 'string' || key.length === 0){
            throw new Error('Invalid argument: property key must be a string');
        }

        if (object[key]){
            throw new Error('Invalid argument: key ' + key + ' already set');
        }

        var kovar = ko.observableArray(initValue);

        Object.defineProperty(object, key, {
            get: function(){
                return kovar();
            },
            set: function(val){
                kovar(val);
            },
            enumerable: true
        });

        return kovar;
    }

    ko.gsObservable      = exports.gsObservable      = gsObservable;
    ko.gsComputed        = exports.gsComputed        = gsComputed;
    ko.gsObservableArray = exports.gsObservableArray = gsObservableArray;
}));
