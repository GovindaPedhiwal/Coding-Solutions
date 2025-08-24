let obj = {
    'a': 'first',
    'b': 'second'
}

function info(...args) {
    console.log(this.a, this.b, ...args)
}
let res = info.bind(obj, 1,2,3,4);
res(11,22);

// created temporary symbol in the object
Function.prototype.customBindVariant1 = function(context, ...args) {
    if(typeof this !== 'function')
        throw new Error(this + 'is not a function');

    const currentFunction = this;
    const symbolFn = Symbol();
    context[symbolFn] = currentFunction;
    return function(...moreArgs) {
        return context[symbolFn](...args, ...moreArgs);
    };
}
// created temporary function in the object
Function.prototype.customBindVariant2 = function(context, ...args) {
    if(typeof this !== 'function')
        throw new Error(this + 'is not a function');

    const currentFunction = this;
    context.fn = currentFunction;
    return function(...moreArgs) {
        return context.fn(...args, ...moreArgs);
    };
}

let temp1 = info.customBindVariant1(obj, 1,2,3,4);
temp1(11, 22);
let temp2 = info.customBindVariant2(obj, 5,4,1,8);
temp1(11, 223);