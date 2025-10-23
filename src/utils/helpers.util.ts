import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const hashToken = (token: string) => {
        const hash = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');

          return hash;
    }

export const enumToArray = (d: object, op:'keys-only'| 'values-only' | 'key-values')=>{

    let result: Array<string | [string, any]> = []

    if(op === 'keys-only'){
        result = Object.keys(d)
    }
    if(op === 'values-only'){
        result = Object.values(d)
    }
    if(op === 'key-values'){
        result = Object.entries(d)
    }

    return result;

}

export const asyncHandler = (fn:Function)=>(req:Request, res:Response, next:NextFunction)=>{
    Promise.resolve(fn(req, res, next)).catch(next);
}