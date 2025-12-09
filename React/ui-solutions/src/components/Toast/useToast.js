import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
    const {addMessage} = useContext(ToastContext);
    return {
        addMessage
    }
}