class AsyncTaskQueue {
    concurrencyLimit;
    taskLists = [];
    currentTask = -1;

    constructor(limit) {
        this.concurrencyLimit = limit;
    }
    addTasks(task) {
        this.taskLists.push(task);
        this.runTasks();
    }
    async runTasks() {
        if(this.concurrencyLimit > 0 && this.taskLists.length > this.currentTask + 1) {
            this.currentTask++;
            this.concurrencyLimit--;
            const resp = await this.taskLists[this.currentTask]();
            this.concurrencyLimit++;
            this.runTasks();
            console.log(resp)
        }
    }
}


const task1 = () => new Promise((resolve,reject) => setTimeout(() => resolve('task1'), 500));
const task2 = () => new Promise((resolve,reject) => setTimeout(() => resolve('task2'), 2900));
const task3 = () => new Promise((resolve,reject) => setTimeout(() => resolve('task3'), 900));
const task4 = () => new Promise((resolve,reject) => setTimeout(() => resolve('task4'), 600));

const queue = new AsyncTaskQueue(2);
queue.addTasks(task1);
queue.addTasks(task2);
queue.addTasks(task3);
queue.addTasks(task4);






// bigfrontend.dev
// js question no 179