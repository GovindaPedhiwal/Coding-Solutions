const obj = {
    'a': 'hello',
    'b': 'world'
}

function info(...args) {
    console.log(this.a, this.b, ...args)
}

info.apply(obj, [1,2,3,4,5])
info.apply("Hello", [1,2,3,4,5])

const temp = {
    'a': 'this is',
    'b': 'the'
}

// creating temporary symbol inside object and then calling it
Function.prototype.customApplyVariant1 = function(context, ...args) {
    if(typeof this !== 'function')
        throw new Error(this + 'is not a function')
    if(context == null || context == undefined) {
        context = globalThis;
    } else {
        context = Object(context);
    }
    let currentFunction = this;
    const fnSymbol = Symbol();
    context[fnSymbol] = currentFunction;    
    if(!args) {
        context[fnSymbol]();
    } else {
        if(!Array.isArray(args)) {
            throw new Error('CreateListFromArrayLike called on non-object');
        }
        context[fnSymbol](...args);
    }
    delete context[fnSymbol];
}
// creating temporary function inside object and then calling it
Function.prototype.customApplyVariant2 = function(context, args) {
    if(typeof this !== 'function')
        throw new Error(this + 'is not a function')
    if(context == null || context == undefined) {
        context = globalThis;
    } else {
        context = Object(context);
    }
    let currentFunction = this;
    context.fn = currentFunction;
    if(!args) {
        context.fn();
    } else {
        if(!Array.isArray(args)) {
            throw new Error('CreateListFromArrayLike called on non-object');
        }
        context.fn(...args);
    }
    delete context.fn;
}

info.customApplyVariant1(temp, [11,33,55]);
info.customApplyVariant1("Hello", [11,33,55]);
info.customApplyVariant1(temp);
info.customApplyVariant1(temp, 24,11);
info.customApplyVariant2(temp, [11,33,55]);
info.customApplyVariant2("Hello", [11,33,55]);
info.customApplyVariant2(temp);
info.customApplyVariant2(temp, 24,11);

// points to note:
// it only accepts array or no value
// when pass values seperated by comma it throws error
// when pass no value to the function then args value is undefined