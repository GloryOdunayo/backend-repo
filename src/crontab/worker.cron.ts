import nodeCron, { ScheduledTask, TaskFn } from "node-cron";
import { EventEmitter } from "node:events";

// # ┌────────────── second (optional) *, 0-59
// # │ ┌──────────── minute *, 0-59
// # │ │ ┌────────── hour *, 0-23
// # │ │ │ ┌──────── day of month *, 1-31
// # │ │ │ │ ┌────── month *, 1-12, Jan, Feb,Mar ... Dec, January, February, March... December
// # │ │ │ │ │ ┌──── day of week *, 0-7, Mon, Tue... Sun, Monday, Tuesday... Sunday
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

// o and 7 represent sunday

interface ICornWorker {
    cron: any| string;
    task: ScheduledTask | null;
    schedule(scheduled: boolean, cb: TaskFn, timezone?: string): void;
    stop():void;
    start():void;
    destroy():void;
    validate(cron: any| string): boolean;
}

class CronWorker implements ICornWorker {
    public cron: string |any;
    public task: ScheduledTask | null;
    public event: EventEmitter;

    constructor(){
        this.cron = "* * * * *";
        this.event = new EventEmitter();
        this.task = null;
    }

    get expression(){
        return this.cron;
    }

    set expression(cron: string | any){
        this.cron = cron;
    }

    public schedule(scheduled: boolean, cb: TaskFn, timezone?: string): void {
        if(this.validate(this.cron)){
            if(scheduled){
                this.task = nodeCron.schedule(this.cron, cb, {
                    timezone: timezone ? timezone : "Africa/Lagos",
                    // maxExecutions : 3,
                });

                // automatically start the task
                this.start();
            } else {
                this.task = nodeCron.schedule(this.cron, cb, {
                    timezone: timezone ? timezone : "Africa/Lagos",
                    // maxExecutions : 3,
                });
            }
        } else {
            throw new Error(`Invalid cron expression: ${this.cron}`);
        }

        process.on ('SIGINT', async () => {
            this.stop();
            console.log('[SIGINT]: Shutdown cron worker listener');
        });
        
        process.on ('SIGTERM', async () => {
            this.stop();
            console.log('[SIGTERM]: Shutdown cron worker listener');
        });
    }
    public start(): void {
        if(this.task){
            this.task.start();
        }
    }

    public stop(): void {
        if(this.task){
            this.task.stop();
        }
    }
    public destroy(): void {
        if(this.task){
            this.task.destroy();
        }
    }
    public validate(cron: any | string): boolean {
        return nodeCron.validate(cron);
    }
}

export default CronWorker;