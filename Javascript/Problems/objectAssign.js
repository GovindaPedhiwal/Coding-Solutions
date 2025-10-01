const unique_symbol = Symbol();
let obj1 = {
    [unique_symbol]: 11111,
    'a': 'hello',
    'b': 'world'
}
let obj2 = {
    'c': '1234',
    'd': 'lalslf'
}

let target = {};

Object.assign(target, obj1, null, undefined, obj2);
console.log(target)

// description
// this is responsible to copy data from one object to another one
// symbol need to add and in target is property is not writable then need to throw error
// number, boolean and string need to handle
// target and source need to validate
// only need to consider enumerable properties

// important points
// if Object defineProperty property is writable false then it will not allow to override the value of that key from another object
// Object.keys does not written symbol so need to handle separately
// Object.keys written only enumerable properties whereas Object.getOwnPropertySymbols returns all

Object.prototype.customObjectAssign = function(target, ...sources) {
    if(target == null || target == undefined) {
        throw Error('target is not valid')
    }
    let obj = target;
    if(['number', 'boolean', 'string'].includes(typeof target)) {
        obj = new Object(target);
    }

    for(let src of sources) {
        if(src == null || src == undefined) continue;
        let keys = [
            ...Object.keys(src),
            ...Object.getOwnPropertySymbols(src)
        ].filter(item => Object.getOwnPropertyDescriptor(src, item).enumerable);
        for(let key of keys) {
            if(Object.getOwnPropertyDescriptor(obj, key) && Object.getOwnPropertyDescriptor(obj, key).writable == false) {
                throw Error('this prop can not be written')
            }
            obj[key] = src[key];
        }
    }
    return obj;
}

let target1 = Object.defineProperty({}, 'a', {
    value: 1,
    writable: false
});
let target2 = Object.defineProperty({}, 'a', {
    value: 1,
    writable: true
});
Object.customObjectAssign(target1, obj1, null, undefined, obj2)
Object.customObjectAssign(target2, obj1, null, undefined, obj2)

console.log(target1)
console.log(target2)

// bigfrontend.dev
// problem no 26
