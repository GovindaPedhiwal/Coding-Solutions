let obj = {
    'a': 'hello',
    'b': 'world'
}

function info(...args) {
    console.log(this.a, this.b, ...args, this)
}

info.call(obj, 1,2,3,4)
info.call("hello")

// in first variant using symbol temporary in object and then calling it
Function.prototype.customCallVariant1 = function(context, ...args) {
    if(typeof this !== 'function')
        throw new Error(this + ' is not a function');

    if(context == null || context == undefined) {
        context = globalThis;
    } else {
        context = Object(context);
    }
    let currentFunction = this;
    const fnSymbol = Symbol();
    context[fnSymbol] = currentFunction;
    context[fnSymbol](...args);
    delete context[fnSymbol];
}
// in second variant create temporary function inside object and then calling it
Function.prototype.customCallVariant2 = function(context, ...args) {
    if(typeof this !== 'function')
        throw new Error(this + ' is not a function');
    if(context == null || context == undefined) {
        context = globalThis;
    } else {
        context = Object(context);
    }
    let currentFunction = this;
    context.fn = currentFunction;
    context.fn(...args)
    delete context['fn'];
}

let temp1 = {
    'a': 'abab',
    'b': 'llllllllll'
}


info.customCallVariant1(temp1, 1,3,11,22)
info.customCallVariant1("hello")
info.customCallVariant2(temp1, 1,45,11,22)
info.customCallVariant2("hello world")

// points to note:
// it takes values seperated by comma if pass array then it considers it value
// it takes no value also
// if no value being passed to function then ...args is empty array