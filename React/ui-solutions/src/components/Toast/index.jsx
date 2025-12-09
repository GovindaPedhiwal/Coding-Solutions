import React, { useEffect } from 'react'
import { TYPE } from './constant';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';
import { toast } from './services/toast.service';
import { triggerMessages } from './util/util';

const ToastWrapper = () => {
    return (
        <div>
            <ToastProvider>
                <h1>Toast</h1>
                
                <FirstWorld />
            </ToastProvider>
        </div>
    )
}

const FirstWorld = () => {
    const {addMessage} = useToast();
    useEffect(() => {
        toast.set(addMessage);
    }, []);
    return <Actions />
}

const Actions = () => {
    const { addMessage } = useToast();
    return <div>
         <button onClick={() => {
                    addMessage({ type: TYPE.SUCCESS, message: 'First to the!' })
                }}>Success!</button>
                <button onClick={() => {
                    toast.notify({
                        type: TYPE.WARNING,
                        message: 'First to!'
                    })
                }}>Error!</button>
                <button onClick={() => {
                    toast.notify({
            type: TYPE.ERROR,
            message: 'First to the error!'
        })
                }}>Warning!</button>
                <button onClick={() => triggerMessages()}>From Util</button>
    </div>
}

export default ToastWrapper