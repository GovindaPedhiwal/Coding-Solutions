function sum(a,b,c) {
    console.log(a,b,c)
}

const _ = '_'

function partial(callback, ...presentArgs) {
    const replacePlaceholderWithValues = (latestArgs) => {
        let updatedValues = [];
        let idx = 0;
        for(let i = 0;i < presentArgs.length; i++) {
            if(presentArgs[i] == _) {
                updatedValues.push(idx < latestArgs.length ? latestArgs[idx] : undefined);
                idx++;
            } else {
                updatedValues.push(presentArgs[i]);
            }
        }
        updatedValues = [...updatedValues, ...latestArgs.splice(idx)];
        return updatedValues;
    }

    return function(...latestArgs) {
        const updatedValues = replacePlaceholderWithValues(latestArgs)
        callback.call(this, ...updatedValues)
    }
}

const sum_ = partial(sum, _,5,_);
sum_(10,20)
const sum1_ = partial(sum, _,_,6);
sum1_(10,24)
const sum2_ = partial(sum, 12,_,_);
sum2_(10)

const sum3_ = partial(sum, 5, 6);
sum3_(20)

// bigfrontend.dev
// problem no 139

