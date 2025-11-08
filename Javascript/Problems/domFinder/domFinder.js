const getPathFromChildToParent = (parent, child) => {
    let currentNode = child;
    const path = []
    while(parent !== currentNode) {
        const parentNode = currentNode.parentNode;
        const children = parentNode.children;
        const index = Array.from(children).indexOf(currentNode);
        path.push(index)
        currentNode = parentNode;
    }
    return path;
}
const getValueFromPath = (parent, path) => {
    let currentNode = parent;
    while(path.length) {
        currentNode = currentNode.children[path.pop()]
    }
    return currentNode.innerText;
}
const findDomNodeValue = () => {
    const rootA = document.getElementById('rootA')
    const rootB = document.getElementById('rootB')
    const nodeA = document.getElementById('nodeA')
    const path = getPathFromChildToParent(rootA, nodeA)
    return getValueFromPath(rootB, path);
}

const nodeValue = findDomNodeValue();
console.log(nodeValue)
