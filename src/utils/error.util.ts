import { ErrorType } from "./types.util";

class ErrorResponse extends Error {

    public message: string;
    public statusCode: number;
    public errors: ErrorType;
    public data: any;
    public errorStack: any

    constructor(message: string, statusCode: number, errors: ErrorType, data?: any){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = data? data : null;
        this.errorStack = this.stack
    }

}

export default ErrorResponse;