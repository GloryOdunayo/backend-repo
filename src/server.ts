import colors from "colors";
import seedData from "./config/seeds/seeder.seed";
import app from "./config/app.config";
import connectDB from "./config/db.config";
import { startWorkers } from "./queues/worker.queue";
import { unlockUsersCron } from "./crontab/user.cron";

const init = async (): Promise<void> => {
  // connect database
  await connectDB();

  // log heap stats


  // seed data to db if available
  await seedData();

  // maximum listeners for process
  process.setMaxListeners(20);

  // start queue workers
  startWorkers();

  // start cron jobs automatically
  // run every second of every 30th min, of every hour of every day of every month, of every month of every day of the week
  // second , 30 minutes, hour, 1-31, jan-dec, sun-sat 
  unlockUsersCron("* */30 * * * *"); // every 30 minutes
}

init();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(colors.yellow.bold(`Server running on port ${PORT}`)));

// unhandle promise rejection

process.on('unhandleRejection', (err:any, promise)=>{
  console.log(err.message, 'error')
  server.close(()=>promise.exit(1));
})
