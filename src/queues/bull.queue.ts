import Bull, { Queue, QueueOptions, Job, DoneCallback } from "bull";
import { AddQueueJobDTO, CreateQueueDTO, CreateWorkerDTO, JobDataDTO } from "../dtos/queue.dto";

class BullQueue {
    private queues: Map<string, Queue> = new Map();

    private HOST: string;
    private PORT: string;
    private USER: string;
    private PASSWORD: string;

    constructor(){
        if(!process.env.REDIS_HOST){
            throw new Error('redis host is not defined')
        }
        if(!process.env.REDIS_PORT){
            throw new Error('redis port is not defined')
        }
        if(!process.env.REDIS_USER){
            throw new Error('redis user is not defined')
        }
        if(!process.env.REDIS_PASSWORD){
            throw new Error('redis password is not defined')
        }
        

        this.HOST = process.env.REDIS_HOST;
        this.PORT = process.env.REDIS_PORT;
        this.USER = process.env.REDIS_USER;
        this.PASSWORD = process.env.REDIS_PASSWORD;
    }

    /**
     * @name createQueue
     * @param data 
     * @returns 
     */
    public async createQueue(data: CreateQueueDTO)  : Promise<Queue>{
        const { name } = data;

        if(this.queues.has(name)){
            return this.queues.get(name)!;
        }

        const options: QueueOptions = {
            redis: {
                tls: {
                    rejectUnauthorized: false,
                    minVersion: 'TLSv1.2'
                },
                maxRetriesPerRequest: null,
                enableReadyCheck: false,
                connectTimeout: 80000,
                host: this.HOST,
                password: this.PASSWORD,
                username: this.USER,
                port: parseInt(this.PORT),
            },
            defaultJobOptions : {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000
                }
            }
        }

        const newQueue = new Bull(name, options);

        this.queues.set(name, newQueue);

        return newQueue;
    }

    /**
     * @name addProcessor
     * @description using the functions/worker attached to a jobName to process the available jobs in the queue
     * @param data 
     * @param callback 
     */
    public async addProcessor(data: CreateWorkerDTO, callback: (data: Job<JobDataDTO>, done: DoneCallback)=> Promise<void> ): Promise<Queue>{
        const { jobName, queueName, concurrency= 10 } = data;

        const queue = await this.createQueue({name: queueName});
        // process with the worker which contain the job function, 
        // process job with concurrency
        queue.process(jobName, concurrency, callback);

        // completed
        queue.on('completed', (job)=>{
            console.log(`job with the id: ${job.id} is completed`)
        })
        // failed
        queue.on('failed', (job, err)=>{
            console.log(`job with the id: ${job.id} failed for queue: ${job.name} with error: ${err.message}`)
        })
        // error
        queue.on('error', (err)=>{
            console.log(`job with the name: ${queue.name} experience error: ${err.message}`)
        })

        return queue;
    }

    /**
     * @name addJobs 
     * @description only adding the job to the queue
     * @param data 
     */
    public async addJobs(data: AddQueueJobDTO): Promise<void>{
        const { jobs, queueName } = data;

        const queue = await this.createQueue({name: queueName});

        const bullJobs = jobs.map(job =>({
            name: job.name,
            data: job.data,
            opts: job.options,
        }))

        // add all jobs
        await queue.addBulk(bullJobs);

        // logs add jobs
        const jobIds= bullJobs.map(job => job.opts?.jobId || "N/A").join(", ");
        console.log(`Added ${jobIds.length} jobs to queue ${queue.name}. Jobs Id: ${jobIds}`)
    }

    /**
     * @name getJobs
     * @param name The name of the queue to retrieve
     * @returns The queue instance or undefined if not found
     */
    public getJobs(name: string): Queue | undefined{
        return this.queues.get(name);
    }
}

export default new BullQueue();