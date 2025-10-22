import { DoneCallback, Job } from "bull";
import { JobDataDTO } from "../../dtos/queue.dto";
import User from "../../models/User.model";

const unlockUsersAccountJob = async (job: Job, done: DoneCallback) => {
    try {
        const { } = job.data;
        const users = await
        //  User.find({ isActive: true, isLocked: true, lockUntil: { $lt: new Date() } });
         User.find({ isActive: true, isLocked: true, });

         if (users.length > 0){
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                user.isLocked = false;
                user.login.limit = 0;

                await user.save();
            }
         }

        // for (const user of users) {
        //     user.isLocked = false;
        //     user.lockUntil = undefined;
        //     await user.save();
        // }
    } catch (err) {
        
    }
}

export { unlockUsersAccountJob };