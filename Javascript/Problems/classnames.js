const classNames = (...args) => {
    let result = [];
    args.forEach((classItem) => {
        const type = typeof classItem;
        if(!classItem) return;
        if(['string','number'].includes(type)) {
            result.push(classItem);
        } else if(Array.isArray(classItem)) {
            result.push(classNames(...classItem));
        } else if(type == 'object') {
            for(let key in classItem) {
                if(Object.hasOwn(classItem, key) && classItem[key]) {
                    result.push(key);
                }
            }
        }
    })
    return result.join(' ');
}



console.log(classNames('foo', 'bar')); // => 'foo bar'
console.log(classNames('foo', { bar: true })); // => 'foo bar'
console.log(classNames({ 'foo-bar': true })); // => 'foo-bar'
console.log(classNames({ 'foo-bar': false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })); // => 'foo bar baz quux'

// other falsy values are just ignored
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // => 'bar 1'
console.log(classNames('foo', ['bar', { baz: true, qux: false }]));
// => "foo bar baz"