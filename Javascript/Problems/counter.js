function createCounter() {
    let count = -1;
    return {
        get count() {
            count++;
            console.log(count)
        }
    }
}

let counter = createCounter();
counter.count
counter.count
counter.count
counter.count = 100;
counter.count

// points to remember
// it's not able to modify the value manually because it's getter function not setter

// bigfrontend.dev
// problem no 148