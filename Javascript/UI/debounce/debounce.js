let search_btn = document.getElementById('search_btn')
let count = 0;
function searchList(...args) {
    count++;           
    console.log('value:', ...args, count)  
}


const debounce = function(callback, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

const debounceHandler = debounce(searchList, 300);


search_btn.addEventListener('keyup', (event) => {
    debounceHandler(event.target.value, 'world');
})