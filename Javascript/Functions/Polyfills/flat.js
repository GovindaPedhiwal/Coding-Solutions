const arr = [1,2,3,[4,5,[6,7,8]],[11,12,13]]

const flatten = (arr) => {
    const result = [];
    arr.forEach((item) => {
        if(Array.isArray(item)) {
            result.push(...item);
        } else
        result.push(item);
    })

    return result;
}

console.log(flatten(arr))

const flattenDeep = (arr) => {
    let result = [];
    arr.forEach((item) => {
        if(Array.isArray(item)) {
            result.push(...flattenDeep(item));
        } else {
            result.push(item);
        }
    })

    return result;
}

console.log(flattenDeep(arr));

const data = [1,2,3,[4,5,[6,7,[8]]],11,12,[13,14]]

const flattenDepth = (arr, depth = 1) => {
    if(depth == 0) {
        return arr;
    }
    let result = [];
    arr.forEach((item) => {
        if(Array.isArray(item)) {
            result.push(...flattenDepth(item, depth - 1));
        } else {
            result.push(item);
        }
    })
    return result;
}

console.log(flattenDepth(data,1))
console.log(flattenDepth(data,2))
console.log(flattenDepth(data,3))




