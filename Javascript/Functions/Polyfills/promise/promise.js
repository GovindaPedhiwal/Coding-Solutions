const STATE = {
    FULFILLED: 'fulfilled',
    PENDING: 'pending',
    REJECTED: 'rejected'
}

class MyPromise {
    #value = ''
    #state = STATE.PENDING
    #thenCbs = []
    #catchCbs = []
    constructor(callback) {
        try {
            callback(this.#onSuccess, this.#onFail);
        } catch(e) {
            this.#onFail(e);
        }
    }

    // resolve
    #onSuccess = (value) => {
        if(this.#state === STATE.PENDING) {
            this.#value = value;
            this.#state = STATE.FULFILLED
            this.#runCallBacks();
        }
    }
    // reject
    #onFail = (value) => {
        if(this.#state === STATE.PENDING) {
            if(this.#catchCbs.length === 0) {
                throw new Error('Uncaught Promise')
            }
            this.#value = value;
            this.#state = STATE.REJECTED;
            this.#runCallBacks();
        }
    }
    #runCallBacks = () => {
        queueMicrotask(() => {
            if(this.#state === STATE.FULFILLED) {
                this.#thenCbs.forEach((callbackFn) => {
                    callbackFn(this.#value)
                })
                this.#thenCbs = []
            }
            if(this.#state === STATE.REJECTED) {
                this.#catchCbs.forEach((callbackFn) => {
                    callbackFn(this.#value)
                })
                this.#catchCbs = []
            }
        })

    }
    then = (thenCb, catchCb) => {
        return new MyPromise((resolve, reject) => {
                this.#thenCbs.push((value) => {
                    if(!thenCb) {
                        resolve(value);
                        return;
                    }
                    const result = thenCb(value);
                    resolve(result);
                });
                this.#catchCbs.push((value) =>  {
                    if(!catchCb) {
                        reject(value);
                        return;
                    }
                    const result = catchCb(value);
                    resolve(result);
                });
            this.#runCallBacks();
        })
    }
    catch = (cb) => {
        return this.then(undefined, cb)
        // this.#catchCbs.push(cb)
        // this.#runCallBacks();
    }

    static resolve = (data) => {
        return new MyPromise((resolve) => {
            resolve(data);
        })
    }
    static reject = (data) => {
        return new Promise((reject) => {
            reject(data);
        })
    }
}
console.log(1)
const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('aaa')
    }, 1000)
});
console.log(2)
console.log(myPromise)
myPromise.then((res) => {
    console.log(res)
    return 1;
}).then(res => {
    console.log(res)
    return 'hello'
}).then(res => {
    console.log(res)
    return '11'
}).catch().catch(err => {
    console.log('aaaa',err)
})