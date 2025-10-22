import colors from "colors";
import seedData from "./config/seeds/seeder.seed";
import app from "./config/app.config";
import connectDB from "./config/db.config";
import { startWorkers } from "./queues/worker.queue";

const init = async (): Promise<void> => {
  // connect database
  await connectDB();

  // log heap stats


  // seed data to db if available
  await seedData();

  // start queue workers
  startWorkers();
}

init();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(colors.yellow.bold(`Server running on port ${PORT}`)));

// unhandle promise rejection

process.on('unhandleRejection', (err:any, promise)=>{
  console.log(err.message, 'error')
  server.close(()=>promise.exit(1));
})
