const promise1 = new Promise((resolve,reject) => setTimeout(() => reject('hello'), 2000));
const promise2 = new Promise((resolve,reject) => setTimeout(() => resolve('world'), 3000));
const promise3 = new Promise((resolve,reject) => setTimeout(() => resolve('to the'), 1000));
const promise4 = new Promise((resolve,reject) => setTimeout(() => resolve('hi'), 6000));

const promise = Promise.race([promise1, promise2, promise3, promise4])

promise.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})

const race = (promises) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            return reject(new TypeError('Arguments must be an array'));
        }
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve)
            .catch(reject)
        })
    })
}

const customRace = race([promise1, promise2, promise3, promise4])

customRace.then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})