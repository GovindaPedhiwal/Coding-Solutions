function func(...args) {
    console.log('function calling', args)
}

function once_variant_1(callback, context) {
    let executed = false;
    return (...args) => {
        if(!executed && callback) {
            executed = true;
            callback.apply(context, args);
        }
    }
}

const once_variant_1_Wrapper = once_variant_1(func);
once_variant_1_Wrapper(2,4)
once_variant_1_Wrapper(1,4)


function sum(a,b) {
    console.log('sum:', a + b)
}

function once_variant_2(callback, context) {
    let result;
    return (...args) => {
        if(callback) {
            result = callback.apply(context, args);
            callback = null;
        }
        return result;
    }
}

const once_variant_2_Wrapper = once_variant_2(sum);
once_variant_2_Wrapper(1,3);
once_variant_2_Wrapper(1,5);

