import { useRef, useState } from "react";
import Notification from "./Notification/Notification";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({children}) => {
        const [toasts, setToasts] = useState([]);
        const timerRef = useRef({});

        const removeNotification = (id) => {
            clearTimeout(timerRef.current[id]);
            delete timerRef.current[id];

            setToasts((prev) => {
                const prevToasts = structuredClone(prev);

                return prevToasts?.filter((toast) => toast?.id !== id);
            })
        }

        const addMessage = (message) => {
            console.log(message)
            const id = Date.now();
            setToasts(prev => [...prev, {id: id, ...message}]);

            timerRef.current[id] = setTimeout(() => {
                removeNotification(id);
            }, 3000);  
        }
    console.log(toasts)
    return<ToastContext.Provider value={{addMessage}}>
            {children}
            <Notification toasts={toasts} />            
    </ToastContext.Provider>
}