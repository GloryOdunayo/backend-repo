import Axios, { AxiosError } from "axios";
import { CallAxioDTO } from "../dtos/axios.dto";
import { IResult } from "../utils/interfaces.util";

class AxiosService {
    constructor(){}

    /**
     * @name call
     * @description making axios request
     * @param data 
     * @returns 
     */
    public async call(data: CallAxioDTO): Promise<IResult>{
        let result: IResult  = { error: false, message: "", code: 200, data: null }
        const { method,path, header, body } = data;

        await Axios({
            method: method,
            headers: header,
            url: path,
            data: body
        })
        .then((res)=>{
            result.error = false;
            const status = res.status;
            result.data = { ...res.data, status: status };
        })
        .catch((err: AxiosError)=>{
            result.error= true;
            result.message = err?.message ? err.message : "An error occured, please try again later.";
            result.data = err.response && err.response.data ? err.response.data : null;
            console.log(err)
        })

        return result;
    }
}

export default new AxiosService();