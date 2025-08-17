let arr = [1,2,3,4,5]

let res = arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
})
let res1 = arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
}, 5)

console.log(res)
console.log(res1)

Array.prototype.customReduce = function(callback, initialValue) {
    const arr = this;
    let result = initialValue ?? arr[0];
    let startIndex = initialValue ? 0 : 1;
    for(let i = startIndex; i < arr.length; i++) {
        result = callback(result, arr[i], i);
    }
    return result;
}

let temp1 = arr.customReduce((previousValue, currentValue) => {
    return previousValue + currentValue;
})
let temp2 = arr.customReduce((previousValue, currentValue) => {
    return previousValue + currentValue;
}, 10)

console.log(temp1)
console.log(temp2)
