function setTimeoutWrapper() {
    const timerMap = {};
    let timerId = 1;
    function setTimeoutCustom(callback, delay, ...args) {
        const id = timerId++;
        timerMap[id] = true;
        const start = Math.floor(performance.now());
        function trigger() {
            if(!timerMap[id]) return;
            if(Math.floor(performance.now()) > start + delay) {
                timerMap[id] = false;
                callback(...args);
                return;
            } 
            requestIdleCallback(trigger)
        }
        requestIdleCallback(trigger);
        return id;
    }
    function clearTimeoutCustom(id) {
        delete timerMap[id];
    }

    return {
        setTimeoutCustom,
        clearTimeoutCustom
    }
}

const { setTimeoutCustom, clearTimeoutCustom } = setTimeoutWrapper();

console.log('hello')

const timer1Id = setTimeoutCustom((...args) => {
    console.log('hello', args)
}, 2000, '1', '2');

clearTimeoutCustom(timer1Id)

const timer2Id = setTimeoutCustom((...args) => {
    console.log('world', args)
}, 5000, 'one', 'two')

