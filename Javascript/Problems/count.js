// 1st version
function countWrapper() {
    let count = 0;
    return function innerCount() {
        innerCount.reset = function() {
            count = 0;
        }
        count++;
        console.log(count)
    }
}

function Random() {

}

let count_ = countWrapper();
console.log('first variant')
count_();
count_();
count_.reset();
count_();
count_.reset();
count_();

// 2nd version

function count() {
    count.value = !count.value ? 1 : count.value + 1;
    count.reset = function() {
        count.value = 0;
    }
    console.log(count.value);
}
console.log('second variant')
count();
count();
count();
count();
count.reset();
count();
count();

// bigfrontend.dev
// problem no 155




