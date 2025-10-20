const items = [
    {
        'id': 1,
        'key': 'one'
    },
    {
        'id': 2,
        'key': 'two'
    },
    {
        'id': 3,
        'key': 'one'
    },
    {
        'id': 4,
        'key': 'three'
    },
    {
        'id': 5,
        'key': 'four'
    }
]

const result = Object.groupBy(items, (item) => item?.key)
console.log(result)

Object.prototype.customGroupBy = function(arr, callback) {
    if(arr == null || arr == undefined) {
        throw Error('Object.groupBy called on null or undefined');
    }
    const groupData = {};
    for(let i = 0;i < arr?.length; i++) {
        const keyName = callback(arr[i]);
        if(!groupData[keyName])
            groupData[keyName] = []
        groupData[keyName].push(arr[i]);
    }
    return groupData;
}

const resultNew = Object.customGroupBy(items, (item) => item?.key)
console.log(resultNew)
