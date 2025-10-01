function chunk(arr, limit) {
    let res = []
    for(let i = 0;i < arr.length; i = i + limit) {
        let values = []
        for(j = 0;j < limit && i + j < arr.length; j++) {
            values.push(arr[i + j]);
        }
        res.push(values);
    }

    return res;
}

let arr = [1,2,3,4,5,6]

console.log(chunk(arr, 2))
console.log(chunk(arr, 3))
console.log(chunk(arr, 4))
console.log(chunk(arr, 1))


// bigfrontend.dev
// problem no 131


