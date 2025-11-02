const set = new Set([1,2,3])
const map = new Map([['one', 1], ['two', 2]])
const originalObject = {
    a: 1,
    b: 'hello',
    c: [3,4, {'mm': 'aaaa'}],
    e: {'info': 'llll'},
    f: () => {

    },
    set_: set,
    map_: map
}

const copy = originalObject;
console.log(copy['e'] == originalObject['e'])
console.log('++++++++')

const cloneDeep = (data) => {
    if(!data) return data;
    if(['string','number','boolean','bigint','symbol','function'].includes(typeof data)) return data;
    if(data instanceof Date) return new Date(data);
    if(data instanceof RegExp) return new RegExp(data);
    if(data instanceof Set) {
        return new Set([...data]?.map((item) => cloneDeep(item)));
    }
    if(data instanceof Map) {
        return new Map([...data]?.map(([key,value]) => [cloneDeep(key), cloneDeep(value)]));
    }
    if(Array.isArray(data)) {
        return data?.map((item) => cloneDeep(item))
    }
    if(typeof data === 'object') {
        let clonedObj = {};
        for(let key in data) {
            clonedObj[key] = cloneDeep(data[key]);
        }
        return clonedObj;
    }
}

const deepCopy = cloneDeep(originalObject);
console.log(originalObject)
console.log(deepCopy)
console.log(originalObject['e'] === deepCopy['e'])
console.log(originalObject['c'] === deepCopy['c'])
console.log(originalObject['f'] === deepCopy['f'])
console.log(originalObject['set_'] === deepCopy['set_'])
console.log(originalObject['map_'] === deepCopy['map_'])

originalObject.t = 'llll'
console.log(originalObject)
console.log(deepCopy)


