
function Wrapper() {
    const timerIds = []
    const originalSetTimeout = window.setTimeout;
    function setTimeout(callback, delay) {
        let timerId = originalSetTimeout(callback, delay);
        timerIds.push(timerId);
        return timerId;
    }
    function clearAllTimeout() {
        timerIds.forEach((timerId) => {
            clearTimeout(timerId);
        })
    }
    return {
        setTimeout, clearAllTimeout
    }
}
const { setTimeout, clearAllTimeout } = Wrapper();

const timerId1 = setTimeout(() => {
    console.log('hello')
}, 2000);
const timerId2 = setTimeout(() => {
    console.log('hi')
}, 3000);
 
const timerId3 =  setTimeout(() => {
    console.log('llll')
}, 500);

clearAllTimeout();