import { HTTPMethodType } from "../utils/types.util";

export interface CallAxioDTO{
    method: HTTPMethodType,
    path: string,
    header: object,
    body?: object,
}