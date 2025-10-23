import { JobChannel, QueueChannel } from "../queues/channel.queue";
import { addJob } from "../queues/jobs/jobs.job";
import CronWorker from "./worker.cron";

export const unlockUsersCron = async (cron: string | any) => {
    // worker - task that mange a set of expression for a cron job
    const cronWorker = new CronWorker();

    // set cron expression
    cronWorker.expression = cron;

    // schedule the cron task
    cronWorker.schedule(true, ()=>{
        console.log('Running unlock users account cron job...');
        addJob({
            queueName: QueueChannel.UnlockUsers,
            jobName: JobChannel.UnlockUsers,
            data: {},
            options: {
                delay: 3000,
            }
        })
    })
};