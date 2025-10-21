import bodyParser from "body-parser";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import routes from '../routes/routes.router';
import morgan from "morgan";
import errorHandler from "../middleware/error.middleware";
import ENV from "../utils/env.util";

config();

const app = express();

// set view engines
app.set('view engines', 'ejs');

// set view folder
app.set('views', './views')

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

if(ENV.isDev || ENV.isStaging){
    app.use(morgan('dev'))
}


app.get('/', (req: Request, res: Response, next: NextFunction) => {
     res.status(200).json({
        error:false,
        errors:[],
        data: {
            name: "e-commerce-backend-api",
            version: "1.0.0",
            author: "Gee"
        },
        message: "successful",
        status: 200
     })
})

// version path
app.use(`/${process.env.API_ROUTE}`, routes)

// error handler
app.use(errorHandler)
export default app;