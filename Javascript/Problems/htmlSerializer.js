const tree = {
  tag: 'body',
  children: [
    { tag: 'div', children: [{ tag: 'span', children: ['foo', 'bar'] }] },
    { tag: 'div', children: ['baz'] },
    { tag: 'div' },
  ],
};

// structure
{/* <body>
    <div>
        <span>
            foo
            bar
        </span>
    </div>
    <div>
        baz
    </div>
</body> */}

const addTabs = (count) => {
    console.log('lll',count)
    return '\t'.repeat(count);
}

const addNewLine = () => {
    return '\n'
}

const serializeHTML = (node, depth = 0) => {
    if(typeof node == 'string')
        return `${addNewLine()}${addTabs(depth)}${node}`
    if(Array.isArray(node)) {
        return node.map((item) => serializeHTML(item, depth)).join('');
    }

    return `${depth == 0 ? '' : addNewLine()}${addTabs(depth)}<${node.tag}>${node.children ? serializeHTML(node.children, depth + 1): ''}${addNewLine()}${addTabs(depth)}</${node.tag}>`
}


console.log(serializeHTML(tree))
