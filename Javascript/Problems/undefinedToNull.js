let arr = ['hello','world',undefined, 'hi', null, {
    'a': 'wowww',
    'b': undefined,
    'c': ['lll',undefined, null]
}]


function undefinedToNull(value) {
    if(Array.isArray(value)) {
        return value?.map((item) => undefinedToNull(item));
    }
    if(value === undefined) {
        return null;
    }
    if(value && typeof value == 'object') {
        for(let key in value) {
            value[key] = undefinedToNull(value[key]);
        }
    }

    return value;
}

console.log(arr)

console.log(undefinedToNull(arr))

// bigfrontend.dev
// problem no 176