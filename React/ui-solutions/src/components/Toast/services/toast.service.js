class ToastService {
    fn = null
    set(fn) {
        this.fn = fn;
    }

    notify(message) {
        if(!this.fn) {
            console.log('there is no initialization happened')
        } else {
            this.fn(message);
        }
    }
}

export const toast = new ToastService();

