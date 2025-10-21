import crypto from 'crypto';

class SystemService {

    constructor(){}

    /**
     * @name hashToken
     * @param token 
     * @returns 
     */
    public hashToken(token: string){
        const hash = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');

          return hash;
    }


    /**
     * @name enumToArray
     * @param d 
     * @param op 
     * @returns 
     */
    public enumToArray (d: object, op:'keys-only'| 'values-only' | 'key-values'){

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
}

export default new SystemService ();