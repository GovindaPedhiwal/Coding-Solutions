import React, { useState } from 'react'
import './style.css'

const NewFolder = ({path, clickAddFolder, handleAddFolder}) => {
    const [folderName, setFolderName] = useState('');
    const saveFolder = () => {
        handleAddFolder(folderName, path)
        clickAddFolder();
    }
    return  <div className='new-folder'>
            <input type="text" placeholder='new folder name...' onChange={(e) => setFolderName(e.target.value)} />
            
            <button className='save-new-folder' onClick={saveFolder}>Save</button>
        </div>
}
const NewFile = ({path, clickAddFile, handleAddFile}) => {
    const [fileName, setFileName] = useState('');
    const saveFile = () => {
        handleAddFile(fileName, path)
        clickAddFile();
    }
    return  <div className='new-file'>
            <input type="text" placeholder='new file name...' onChange={(e) => setFileName(e.target.value)} />
            
            <button className='save-new-folder' onClick={saveFile}>Save</button>
        </div>
}

const FileContent = ({fileData, path, handleAddFolder, handleAddFile, handleDelete}) => {
    const [addFolder, setAddFolder] = useState(false);
    const [addFile, setAddFile] = useState(false);

    const clickAddFolder = () => {
        setAddFolder(!addFolder);
    }
    const clickAddFile = () => {
        setAddFile(!addFile);
    }
    return <div className='file-content'> 
        <div className="f-e-header">
                <div className='f-e-label'>
                    {
                        fileData?.fileType == 'folder' && <button className='add-folder'> 📁 </button>
                    }
                    {
                        fileData?.fileType == 'file' && <button className='add-file'> 📄 </button>
                    }

                    {fileData?.label}
                </div>
                <div className="f-e-actions">
                    {
                        fileData?.fileType !== 'file' && <>
                            <button className="add-folder" onClick={clickAddFolder}>
                                📁➕
                            </button>
                            <button className="add-file" onClick={clickAddFile}>
                                📄➕
                            </button>
                        </>
                    }
                    <button className="delete-file" onClick={() => handleDelete(path)}>
                        🗑️
                    </button>
                </div>
        </div>
        {
            addFolder && <NewFolder path={path} clickAddFolder={clickAddFolder} handleAddFolder={handleAddFolder}  />
        }
        {
            addFile && <NewFile path={path} clickAddFile={clickAddFile} handleAddFile={handleAddFile}  />
        }
    </div>
}

const FileExplorer = ({totalData, path = '', handleAddFolder, handleAddFile, handleDelete}) => {
    return (
        <div className='file-explorer'>
            {
                totalData?.map((fileData, idx) => {
                    const path_ = path + '/' + idx;
                    return <div className='f-e-list' key={path_}>
                        <FileContent fileData={fileData} handleAddFolder={handleAddFolder} handleAddFile={handleAddFile} handleDelete={handleDelete} path={path_} />
                        {
                            !!fileData?.children?.length && <FileExplorer totalData={fileData?.children} path={path_} handleAddFolder={handleAddFolder} handleAddFile={handleAddFile}
                                handleDelete={handleDelete}
                            />
                        }
                        
                    </div>
                })
            }

        </div>
    )
}

export default FileExplorer