import React, { useState } from 'react'
import FileExplorer from './FileExplorer'
import { data } from './data/data'

const FileExplorerWrapper = () => {
    const [totalData, setTotalData] = useState(data);

    const handleAddFolder = (label, path) => {
        console.log(label, path)
        const pathArray = path?.split('/')?.filter(Boolean);
        console.log(pathArray)
        const lastElementIdx = Number(pathArray.pop());
        const cloneTotalData = structuredClone(totalData);

        let child = cloneTotalData;
        for(let i = 0;i < pathArray.length; i++) {
            child =  child[Number(pathArray[i])]?.children;
        }
        console.log(child)
        child[lastElementIdx].children.push({
            label: label,
            fileType: 'folder',
            children: []
        })


        setTotalData(cloneTotalData);
    }
    const handleAddFile = (label, path) => {
        console.log(label, path)
        const pathArray = path?.split('/')?.filter(Boolean);
        console.log(pathArray)
        const lastElementIdx = Number(pathArray.pop());
        const cloneTotalData = structuredClone(totalData);

        let child = cloneTotalData;
        for(let i = 0;i < pathArray.length; i++) {
            child =  child[Number(pathArray[i])]?.children;
        }
        console.log(child)
        child[lastElementIdx].children.push({
            label: label,
            fileType: 'file',
        })
        
        
        setTotalData(cloneTotalData);
    }
    
    const handleDelete = (path) => {
        console.log(path)
        const pathArray = path?.split('/')?.filter(Boolean);
        console.log(pathArray)
        const lastElementIdx = Number(pathArray.pop());
        let cloneTotalData = structuredClone(totalData);
        
        let child = cloneTotalData;
        if(pathArray?.length == 0) {
            cloneTotalData = child?.filter((_, idx) => idx !== lastElementIdx);
        } else {
            for(let i = 0;i < pathArray.length; i++) {
                if(i !== pathArray.length - 1) {
                    child =  child[Number(pathArray[i])]?.children;
                } else {
                    child = child[Number(pathArray[i])]
                }
            }
            console.log(child)
            child.children = child?.children?.filter((_, idx) => idx !== lastElementIdx)
        }
        setTotalData(cloneTotalData);
    }

    return (
        <div>
            <h1>File Explorer</h1>
            <FileExplorer totalData={totalData} handleAddFolder={handleAddFolder} handleAddFile={handleAddFile} handleDelete={handleDelete} />
        </div>
    )
}

export default FileExplorerWrapper