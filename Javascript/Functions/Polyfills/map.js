let arr = [1,2,3,4,5]

let res = arr.map((item, index) => {
    return item * 2;
})

console.log(res)

Array.prototype.customMap = function(callback, thisArg) {
    let arr = this;
    let result = [];
    for(let i = 0;i < arr.length; i++) {
        result.push(callback.call(thisArg, arr[i], i));
    }
    return result;
}

let temp = arr.customMap((item, index) => {
    return item * 5;
})

console.log(temp)