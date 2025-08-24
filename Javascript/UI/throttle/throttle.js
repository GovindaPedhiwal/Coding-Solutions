const mail_btn = document.getElementById('mail_btn');
let count = 0;
function sendMail(...args) {
    count++;
    console.log('sending mail', ...args, count)
}

function throttle(callback, delay) {
    let waiting;
    let lastArgs;
    function cooldownTimer() {
        setTimeout(() => {
            if(lastArgs) {
                callback.apply(this, lastArgs);
                lastArgs = null;
                cooldownTimer.apply(this);
            } else {
                waiting = false;
            }
            
        }, delay)
    }
    return function(...args) {
        if(!waiting) {
            callback.apply(this, args);
            waiting = true;
            cooldownTimer.apply(this);
        } else {
            lastArgs = args;
        }
    }
}

const throttleHandle = throttle(sendMail, 1200);

mail_btn.addEventListener('click', (event) => {
    throttleHandle('world');
})