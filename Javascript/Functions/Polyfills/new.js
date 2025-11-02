function Info (message) {
    this.type = 'random'
    this.message = message;
}
Info.prototype.action = () => {
    console.log('action going on')
}

const infoObj = new Info('what kind of message is this')
console.log(infoObj)
infoObj.action();


const CustomNew = (constructorFnc, ...args) => {
    let newObj = {}
    Object.setPrototypeOf(newObj, constructorFnc.prototype);
    let result = constructorFnc.apply(newObj, args);
    
    return result instanceof Object ? result : newObj;
}


const customObj = CustomNew(Info, 'hello this is the', 'hi')
console.log(customObj)
customObj.action();