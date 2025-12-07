export const data = {
    1: {
        id: 1,
        parentId: null,
        label: 'First',
        children: [2, 3],
    },
    2: {
        id: 2,
        parentId: 1,
        label: 'This',
        children: []
    },
    3: {
        id: 3,
        parentId: 1,
        label: 'The',
        children: [4]
    },
    4: {
        id: 4,
        parentId: 3,
        label: 'aaaaa',
        children: []
    },
    5: {
        id: 5,
        parentId: null,
        label: 'Second',
        children: []
    }
}