import { JobOptions } from "bull";

export interface CreateQueueDTO {
    name: string,
}

export interface CreateWorkerDTO {
    queueName: string,
    jobName: string,
    concurrency?: number,
}

export interface JobDataDTO {
    name: string,
    data: any,
    options: JobOptions,
}

export interface AddQueueJobDTO {
    queueName: string,
    jobs: Array<JobDataDTO>,
}
export interface AddJobDTO {
    queueName: string,
    jobName: string,
    data: object,
    options?: JobOptions,
}