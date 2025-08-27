// normal function
function sumValues(a,b,c) {
    console.log('values:',a,b,c, 'sum: ',a + b + c)
}
sumValues(2,4,5)

// curry function
function curry(fn) {
    return function(a) {
        return function(b) {
            return function(c) {
                fn(a,b,c);
            }
        }
    }
}

const curriedSum = curry(sumValues);
curriedSum(2)(4)(1);

function curry_(fn) {
    return function curry_Inner(...args){
        if(args.length >= fn.length) return fn(...args);
        return function (...args2) {
            curry_Inner(...args, ...args2)
        }
    }
}

const curriedSum_ = curry_(sumValues);
curriedSum_(2)(4,1)
curriedSum_(1,6)(11)

// bigfrontend.dev
// problem no 1











