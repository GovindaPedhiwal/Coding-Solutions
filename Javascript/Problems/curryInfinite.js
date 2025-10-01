function sum(args) {
    console.log(args)
    let res = args?.reduce((previousValue, currentValue) => previousValue + currentValue);
    return res;
}
// 1st style
function infiniteCurryVariantOne(callback) {
    return function innerCurry(...args) {
        return function(...newArgs) {
            if(newArgs?.length == 0) return callback(args)
            return innerCurry(...args, ...newArgs);
        }
    }
}

const sum_1 = infiniteCurryVariantOne(sum);

console.log(sum_1(2)(4)(6)())
console.log(sum_1(2,4,12,15)(6)())