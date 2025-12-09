import { toast } from "../services/toast.service"
import {TYPE} from '../constant'

export const triggerMessages = () => {
    const message = {
        type: TYPE.ERROR,
        message: 'First to the error!'
    }
    toast.notify(message)
}