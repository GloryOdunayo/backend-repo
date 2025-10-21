import { NextFunction, Request, Response } from "express";

const errorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {

    let error = {...err}

    error.message = err.message;
    error.data = err.data;

    console.log('the error', err);

    let ea: any =[];

    // TODO: implement mongodb error

    if(err.errors != undefined) {
        ea = Object.values(err.errors).map((item:any)=>{
            let m = '';
            if(item.properties){
                m = item.properties.message;
            } else {
                m = item
            }

            return m;
        })
    }

    res.status(error?.statusCode || 500).json({
        error: true,
        errors: error.errors ? error.errors : [],
        data: error.data ? error.data : null,
        message: error.message || "Server Error",
        status: error.statusCode || 500,
    })
}

export default errorHandler;