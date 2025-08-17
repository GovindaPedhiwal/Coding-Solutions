function sum(a,b) {
    return a + b;
}

function memoize(callback, context) {
    const cache = {};
    return (...args) => {
        let cacheArgs = JSON.stringify(args);
        if(!cache[cacheArgs])
            cache[cacheArgs] = callback.call(context || this, ...args);
        return cache[cacheArgs];
    }
}

const sumMemoize = memoize(sum);

console.log(sumMemoize(2,4))
console.log(sumMemoize(1,4))
console.log(sumMemoize(2,4))


