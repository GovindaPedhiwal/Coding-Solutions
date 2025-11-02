const promise1 = new Promise((resolve,reject) => setTimeout(() => resolve('hello'), 2000));
const promise2 = new Promise((resolve,reject) => setTimeout(() => resolve('world'), 3000));
const promise3 = new Promise((resolve,reject) => setTimeout(() => resolve('hi'), 1000));
const promise4 = 1200;


const promise = Promise.all([promise1, promise2, promise3, promise4])

promise.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})

const all = (promises) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        let count = 0, result = [];
        if(promises.length === 0) {
            return resolve([]);
        }
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                count++;
                result[index] = res;
                if(promises?.length == count) {
                    resolve(result)
                }
            }).catch(error => {
                resolve(error)
            })
        })
    })
}

const customAll = all([promise1, promise2, promise3, promise4])
customAll.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})