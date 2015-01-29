#knockout.getset

Simple library to start using `this.property = true;` instead of `this.property(true);` for observables in [Knockout](https://github.com/knockout/knockout).

##Installation

Install from `bower`:

```bash
bower install knockout-getset --save
```

or `npm`:

```bash
npm install knockout.getset --save
```

##Compatibility
Internet Explorer 9+ and literaly anything else. For more information [consult this table](http://kangax.github.io/compat-table/es5/#Getter_in_property_initializer).

##Documentation

###Observable
To define an observable you need:
```js
var viewmodel = {}, initialValue = 1;
ko.gsObservable(viewmodel, 'observableProperty', initialValue);
```

Then `observableProperty` will be available to modification in `viewModel` object:

```js
viewmodel.observableProperty = 1;
viewmodel.observableProperty; //1

viewmodel.observableProperty = 5;
viewmodel.observableProperty; //5
```

If you want to register your own subscriptions with `gsObservable`:

```js
ko.gsObservable(viewModel, 'observableProperty', initialValue)
    .subscribe(function(newValue){
        console.log('I\'ve been changed to %s', newValue);
    });

viewmodel.observableProperty = 5;
//I've been changed to 5
```

###Observable Array
To define an observable array you need:
```js
ko.gsObservableArray(viewmodel, 'observableArray');

viewmodel.observableArray; //[]
```

###Computed
To define a computed you need:
```js
ko.gsComputed(viewmodel, 'computed', function(){
    return 'I\'m computed!';
});

viewmodel.computed; //"I'm computed!"
```

Example on using of computed with observables:
```js
ko.gsObservable(viewmodel, 'name', 'Peter Griffin');

ko.gsComputed(viewmodel, 'title', function(){
    return 'Mr. ' + this.name;
});

viewmodel.title; "Mr. Peter Griffin"

viewmodel.name = 'Brian Griffin';
viewmodel.title; "Mr. Brian Griffin"
```

###Simple objects
Since there is no observables in viewmodel then we can simply skip a 'ko.toJS' or any other unwrap routine. In example:
```js
ko.gsObservable(viewmodel, 'name', 'Peter Griffin');

ko.gsComputed(viewmodel, 'title', function(){
    return 'Mr. ' + this.name;
});

JSON.stringify(viewmodel);
//'{ "name":"Peter Griffin", "title":"Mr. Peter Griffin" }'
```