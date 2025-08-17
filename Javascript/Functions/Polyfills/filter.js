let arr = [1,2,3,4,5]

let res = arr.filter((item, index) => {
    return item % 2 == 0;
})

console.log(res)

Array.prototype.customFilter = function(callback, thisArg) {
    let arr = this;
    let result = []
    for(let i = 0;i < arr.length; i++) {
        if(callback.call(thisArg, arr[i], i)) {
            result.push(arr[i]);
        }
    }
    return result;
}

let temp = arr.customFilter((item, index) => {
    return item % 2 !== 0;
})

console.log(temp)