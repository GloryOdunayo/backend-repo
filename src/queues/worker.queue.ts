import logger from "../utils/logger.util"
import BullQueue from "./bull.queue"
import { JobChannel, QueueChannel } from "./channel.queue"
import { unlockUsersAccountJob } from "./jobs/user.job"

const startUserWorker = async () => {
    const unlockWorker = await BullQueue.addProcessor({
        queueName: QueueChannel.UnlockUsers,
        jobName: JobChannel.UnlockUsers,
        concurrency: 10,
    }, unlockUsersAccountJob)

    return { unlockWorker }
}

export const startWorkers = async () =>{
    const uw = await startUserWorker();

    logger.log('Queue: Started all listeners', {type: 'success'})

    process.on('SIGTERM', async ()=>{
        await Promise.all([
            uw.unlockWorker.close()
        ])
        logger.info('[SIGTERM]: Shutdown all Queue listeners')
    })
    process.on('SIGINT', async ()=>{
        await Promise.all([
            uw.unlockWorker.close()
        ])
        logger.info('[SIGINT]: Shutdown all Queue listeners')
    })
}