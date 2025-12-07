export const STATUS = {
    CHECKED: 'checked',
    UNCHECKED: 'unchecked',
    INDETERMINATE: 'indeterminate'
}

export const data = [
    {
        id: 'root1',
        label: 'First',
        status: STATUS.INDETERMINATE,
        children: [
            {
                id: 'hellofirst',
                label: 'Hello First',
                status: STATUS.CHECKED
            },
            {
                id: 'worldfirst',
                label: 'World First',
                status: STATUS.UNCHECKED,
                children: [
                     {
                        id: 'aa',
                        label: 'Random',
                        status: STATUS.UNCHECKED
                    },
                    {
                        id: 'bb',
                        label: 'Value',
                        status: STATUS.UNCHECKED
                    },
                ]
            },
            {
                id: 'hifirst',
                label: 'Hi First',
                status: STATUS.CHECKED
            },
        ]
    },
    {
        id: 'root2',
        label: 'Second',
        status: STATUS.UNCHECKED,
        children: [
            {
                id: 'hellosecond',
                label: 'Hello Second',
                status: STATUS.UNCHECKED,
                children: [
                    {
                        id: 'll',
                        label: 'Fine',
                        status: STATUS.UNCHECKED
                    },
                    {
                        id: 'aaaa',
                        label: 'This is',
                        status: STATUS.UNCHECKED
                    }
                ]
            },
            {
                id: 'worldsecond',
                label: 'Worldsecond',
                status: STATUS.UNCHECKED
            },
            {
                id: 'hithird',
                label: 'Hithird',
                status: STATUS.UNCHECKED
            },
        ]

    },
    {
        id: 'root3',
        label: 'Third',
        status: STATUS.CHECKED
    }
]