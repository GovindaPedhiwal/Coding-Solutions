function sum(args) {
    console.log('calling',args)
    let res = args?.reduce((previous, current) => previous + current);
    return res;
}

const isEqual = (first, second) => {
    if(first === second) return true;

    if(isNaN(first) && isNaN(second)) return true;

    return false;
}

const areArgumentsEqual = (lastArgs, currentArgs) => {
    if(lastArgs?.length !== currentArgs?.length) return false;

    for(let i = 0;i < currentArgs?.length; i++) {
       if(!isEqual(lastArgs[i], currentArgs[i])) return false;
    }


    return true;
}

function memoizeOne(callback) {
    let lastArgs, result;
    return function(...args) {
        const isEqual = areArgumentsEqual(lastArgs, args);
        if(isEqual) {
            return result;
        } else {
            lastArgs = args;
            result = callback(args)
            return result;
        }
    }
}

const  memoizeSum = memoizeOne(sum);

console.log(memoizeSum(2,4))
console.log(memoizeSum(2,4))
console.log(memoizeSum(12,4))
console.log(memoizeSum(1,12))
console.log(memoizeSum(12,1))
console.log(memoizeSum(12,1))

// bigfrontend.dev
// problem no 122

