// approach with setTimeout
const localStorageVariant1 = {
    setItem(key, value, time) {
        localStorage.setItem(key, value);
        if(time == 0) {
            localStorage.removeItem(key);
        } else {
            setTimeout(() => {
                localStorage.removeItem(key);
            }, time);
        }
    },
    getItem(key) {
        return localStorage.getItem(key);
    },
    removeItem(key) {
        return localStorage.removeItem(key);
    },
    clear() {
        return localStorage.clear();
    }
}

localStorageVariant1.setItem('hello','world', 0);
let res = localStorageVariant1.getItem('hello')
console.log(res)

setTimeout(() => {
    console.log(localStorageVariant1.getItem('hello'))
}, 3000)

// another approach where tracking time when value was created with expiry time

const localStorageVariant2 = {
    setItem(key, value, expiryTime) {
        const modifiedValue = {
            value: value,
            createdAt: Date.now(),
            expiryTime: expiryTime
        }
        localStorage.setItem(key, JSON.stringify(modifiedValue));
    },
    getItem(key) {
        try {
            const {createdAt, expiryTime, value} = JSON.parse(localStorage.getItem(key));
            if(value && (createdAt + expiryTime) <= Date.now()) {
                localStorage.removeItem(key);
                return null;
            }
            return value;
        }
        catch(err) {
            return null;
        }
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}

localStorageVariant2.setItem('first','second', 2000);
let value = localStorageVariant2.getItem('first')

console.log(value)

setTimeout(() => {
    console.log(localStorageVariant2.getItem('first'))
}, 5000)

setTimeout(() => {
    console.log(localStorageVariant2.getItem('first'))
}, 1000)

// bigfrontend.dev
// problem no 135



