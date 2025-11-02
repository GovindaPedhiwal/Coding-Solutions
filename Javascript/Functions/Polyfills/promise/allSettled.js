const promise1 = new Promise((resolve,reject) => setTimeout(() => resolve('hello'), 2000));
const promise2 = new Promise((resolve,reject) => setTimeout(() => reject('world'), 3000));
const promise3 = new Promise((resolve,reject) => setTimeout(() => resolve('hi'), 1000));
const promise4 = 1200;

const promise = Promise.allSettled([promise1, promise2, promise3, promise4])


promise.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})

const allSettled = (promises) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        const result = [];
        let count = 0;
        if(promise.length === 0) {
            return resolve([]);
        }
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                result[index] = { status: 'fulfilled', value: res };
            }).catch(error => {
                result[index] = { status: 'rejected', reason: error };
            }).finally(() => {
                count++;
                if(count == promises.length) {
                    resolve(result)
                }
            })
        })
    })
}

const customAllSettled = allSettled([promise1, promise2, promise3, promise4])

customAllSettled.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})