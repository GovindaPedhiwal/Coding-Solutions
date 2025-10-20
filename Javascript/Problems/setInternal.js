function setInternalWrapper() {
    const timerMap = {};
    let timerId = 1;

    function setIntervalCustom(callback, delay, ...args) {
        let id = timerId++;
        timerMap[id] = true;
        let start = Math.floor(performance.now());
        function retrigger() {
            if(!timerMap[id]) return;
            if(Math.floor(performance.now()) > start + delay) {
                callback(...args);
                start = Math.floor(performance.now());
            }
            requestIdleCallback(retrigger);
        }
        requestIdleCallback(retrigger);
        return id;
    }
    function clearIntervalCustom(timerId) {
        delete timerMap[timerId];
    }
    return {
        setIntervalCustom,
        clearIntervalCustom
    }
}

const { setIntervalCustom, clearIntervalCustom } = setInternalWrapper();

console.log('hi');

let intervalId1 = setIntervalCustom((...args) => {
    console.log('hello', args)
}, 3000, 'one', 'two')

clearIntervalCustom(intervalId1);
let intervalId2 = setIntervalCustom((...args) => {
    console.log('world', args)
}, 2000, '1', '2')



