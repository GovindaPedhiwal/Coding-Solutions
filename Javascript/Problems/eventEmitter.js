// Approach 1
// subscribe is O(1) but release is deleting item from array of O(n)
class EmitterVariant1 {
    eventsList = {};

    subscribe(event, callbackFn) {
        let idx;
        if(!this.eventsList[event]) {
            this.eventsList[event] = []
        }
        idx = this.eventsList[event].length;
        this.eventsList[event].push(callbackFn);
        return {
            release: () => {
                this.eventsList[event].splice(idx,1);
            }
        }
    }   

    emit(event, ...args) {
        if(this.eventsList[event]) {
            let callbackFns = this.eventsList[event];
            for(let callbackFn of callbackFns) {
                callbackFn.call(this, ...args);
            }
        }
    }
}

// Approach 2
// subscribe is O(1) because inserting an item into set and release is also O(1) because deleting an item from set
class EmitterVariant2 {
    subscriptions = new Map();
    subscribe(event, callbackFn) {
        if(!this.subscriptions.has(event)) {
            this.subscriptions.set(event, new Set());
        }
        let subscription = this.subscriptions.get(event);
        const callbackObj = {callbackFn};
        subscription.add(callbackObj);
        return {
            release: () => {
                subscription.delete(callbackObj);
                if(subscription.size == 0)
                    delete this.subscriptions.delete(event);
            }
        }
    }
    emit(event, ...args) {
        if(this.subscriptions.has(event)) {
            let subscription = this.subscriptions.get(event);
            subscription.forEach(({callbackFn}) => {
                callbackFn.call(this, ...args);
            })
        }
    }
}


const callback1 = (...args) => {
    console.log('callback 1', ...args)
}
const callback2 = (...args) => {
    console.log('callback 2', ...args)
}
const callback3 = (...args) => {
    console.log('callback 3', ...args)
}

const emitter = new EmitterVariant2();

const subs1 = emitter.subscribe('first', callback1);
const subs2 = emitter.subscribe('second', callback2);
const subs3 = emitter.subscribe('first', callback3);


emitter.emit('first', 1,2,3,4)

emitter.emit('second', 5,4,2,1)

subs3.release();
emitter.emit('first', 1,2,3,4)

// bigfrontend.dev
// problem no 16