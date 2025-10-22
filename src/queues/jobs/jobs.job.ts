import { AddJobDTO } from "../../dtos/queue.dto";
import Random from "../../services/random.service";
import BullQueue from "../bull.queue";

export const addJob = (payload: AddJobDTO) => {

    const { queueName, jobName, data, options } = payload;

    BullQueue.addJobs({
        queueName: queueName,
        jobs: [
            {
                name: jobName,
                data: data,
                options: options? options : {
                    attempts: 3,
                    delay: 3000,
                    jobId: `${Random.randomCode(6).toUpperCase()}`
                },
            }
        ]

    });

}