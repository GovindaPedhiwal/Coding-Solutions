const obj = {
  'a': 1,
  'b': {
    'c': 123,
    'd': 1111,
    'e': {
        'l': 1122
    }
  },
  'f': [1,2,3,4]
}

const flattenObject = (obj) => {
    const resultObj = {};
    const generateFlatObjects = (obj, parent = '') => {
        for(let key in obj) {
            let newParentKey = parent ? parent + '.' + key : key;
            if(typeof obj[key] === 'object') {
                generateFlatObjects(obj[key], newParentKey);
            } else {
                resultObj[newParentKey] = obj[key];
            }
        }
    }
    generateFlatObjects(obj)
    return resultObj;
}


const result = flattenObject(obj);

console.log(result)