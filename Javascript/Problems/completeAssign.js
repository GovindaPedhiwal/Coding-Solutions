let obj1 = {
    'a': 'hello',
    'b': 'world',
    get first() {

    },
    info: function() {

    }
}

let target1 = {};

// 1st approach
// takign source and assign directly using Object.defineProperties
Object.prototype.completeAssignVariant1 = function(target, ...sources) {
    if(target == null || target == undefined) {
        throw Error('invalid target')
    }

    let obj = target;
    if(['string','number','boolean'].includes(typeof target)) {
        obj = new Object(target);
    }

    for(let source of sources) {
        if(source == null || source == undefined) continue;
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
    return obj;
}

Object.completeAssignVariant1(target1, obj1);

console.log(target1)

let target2 = {};

// 2nd approach
// here taking all the properties and then iterating over it and copying it to target


Object.prototype.completeAssignVariant2 = function(target, ...sources) {
    if(target == null || target == undefined) {
        throw Error('invalid target')
    }
    
    let obj = target;
    if(['string','number','boolean'].includes(typeof target)) {
        obj = new Object(target);
    }
    
    for(let source of sources) {
        if(source == null || source == undefined) continue;
        let propertyDescriptors = Object.getOwnPropertyDescriptors(source);
        let keys = [
            ...Object.getOwnPropertyNames(source),
            ...Object.getOwnPropertySymbols(source)
        ]
        for(let key of keys) {
            Object.defineProperty(target, key, propertyDescriptors[key]);
        }

    }
    return obj;
}

Object.completeAssignVariant2(target2, obj1)

console.log(target2)

// bigfrontend.dev
// problem no 27