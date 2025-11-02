var array1 = [{x: 1, y: 2}, {x: 2, y: 1}];
var array2 = [{x: 1, y: 1}, {x: 1, y: 2}];
var array3 = [{x: 3, y: 1}, {x: 1, y: 2}];

// without using any inbuilt function
function intersectionWithVariant1(comparator, ...rest) {
    if(rest.length === 0) return [];
    const firstArray = [...rest[0]];
    const otherArrays = [...rest.slice(1)];
    const result = [];
    firstArray.forEach((firstArrayItem) => {
        let foundCount = 0;
        for(let i = 0;i < otherArrays.length; i++) {
            let otherArrayItems = otherArrays[i];
            for(let j = 0; j < otherArrayItems.length; j++) {
                let otherArrayItem = otherArrayItems[j];
                let value = comparator(firstArrayItem, otherArrayItem);
                if(value) {
                    foundCount++;
                    break;
                }
            }
        }
        if(foundCount == otherArrays?.length) {
            result.push(firstArrayItem);
        }
    })
    return result;
}

function comparator(arrVal, othVal) {
    return arrVal.x == othVal.x && arrVal.y == othVal.y;
}

let result = intersectionWithVariant1(comparator, array1, array2, array3);

console.log(result)

// with inbuilt function

function intersectionWithVariant2(comparator, ...rest) {
    if(!rest.length) return [];
    const firstArray = [...rest[0]];
    const otherArrays = [...rest.slice(1)];

    return firstArray.filter((firstArrayItem) => otherArrays.every((otherArray) => otherArray.some((otherArrayItem) => comparator(firstArrayItem, otherArrayItem))));
}


const ans = intersectionWithVariant2(comparator, array1, array2, array3)

console.log(ans)





