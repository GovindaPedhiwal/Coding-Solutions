const promise1 = new Promise((resolve,reject) => setTimeout(() => reject('hello'), 2000));
const promise2 = new Promise((resolve,reject) => setTimeout(() => resolve('world'), 3000));
const promise3 = new Promise((resolve,reject) => setTimeout(() => reject('hi'), 1000));
const promise4 = new Promise((resolve,reject) => setTimeout(() => reject('hi'), 1000));

const promise = Promise.any([promise1, promise2, promise3, promise4])

promise.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})

const any = (promises) => {
    return new Promise((resolve, reject) => {
        let failedCount = 0;
        if(!Array.isArray(promises)) {
            return reject(new TypeError('Arguments must be an array'));
        }
        if(promises.length == 0) {
            return reject(new AggregateError([], 'All promises were rejected'));
        }
        promises.forEach((promise) => {
            Promise.resolve(promise).then(res => {
                resolve(res)
            }).catch(error => {
                failedCount++;
                if(failedCount == promises.length) {
                    reject(new AggregateError([], 'All promises were rejected'))
                }
            })
        })
    })
}

const customAny = any([promise1, promise2, promise3, promise4])

customAny.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})
