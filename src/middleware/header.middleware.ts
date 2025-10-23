import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/error.util";
import ENV from "../utils/env.util";

declare global {
    namespace Express {
        interface Request {
            language?: string,
            channel?: string,
        }
    }
}

const validateChannels = async(req: Request, res: Response, next: NextFunction) => {
    const APP_CHANNELS = ENV.APP_CHANNELS;
    const LG = req.headers.lg?.toString().trim().toLowerCase();
    const CH = req.headers.ch?.toString().trim().toLowerCase();

    if(!APP_CHANNELS){
        return next(new ErrorResponse("Error", 500, [`invalid app channel, contact support`]));
    }

    if(!LG && !CH){
        return next(new ErrorResponse("Security violations", 500, [`no language specified, no channel specified`]));
    }
    if(!LG){
        return next(new ErrorResponse("Security violations", 403, [`no language specified`]));
    }
    if(!CH){
        return next(new ErrorResponse("Security violations", 403, [`no channel specified`]));
    }

    const channels = APP_CHANNELS.split(',');

    if(!channels.includes(CH)){
        return next(new ErrorResponse("Security violations", 403, [`invalid channel specified`]));
    }

    req.language = LG;
    req.channel = CH;

    return next();
}

export { validateChannels };