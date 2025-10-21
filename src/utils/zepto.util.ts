import AxiosService from "../services/axios.service";

interface IMailOptions {
    to: Array<{email: string,name?: string;}>;
    fromEmail: string;
    fromName: string;
    subject: string;
    text: string;
    html: any;
    replyTO?: Array<{email: string,name: string;}>;
    cc?: Array<{email: string,name: string;}>;
    attachment?: Array<{content: string, mime: string, name: string;}>;
}

class ZeptoTransport {
    constructor(){}

    public async send(data: IMailOptions, callback: CallableFunction): Promise<void> {

        let replies: Array<{email_address: {address: string, name: string}}> = [];
        let copies: Array<{email_address: {address: string, name: string}}> = [];
        let attach: Array<{content: string, mime_type: string, name: string;}> = [];
        const { to, fromEmail, fromName, subject, text, html, replyTO, cc, attachment } =data;

        if(to.length >0) {
            // address to send email to
            const toList = to.map((x)=>{
                return {
                    "email_address": {
                        "address": x.email,
                        "name": x.name,
                    }
                }
            })

            // address to send replies to
            if(replyTO && replyTO.length > 0){
                replies = replyTO.map((x)=>{
                    return {
                        "email_address": {
                            "address": x.email,
                            "name": x.name,
                        }
                    }
                })
            }
            // address to send copies to
            if(cc && cc.length > 0){
                copies = cc.map((x)=>{
                    return {
                        "email_address": {
                            "address": x.email,
                            "name": x.name,
                        }
                    }
                })
            }

            // attachment
            if(attachment && attachment.length > 0){
                attach = attachment.map((x)=>{
                    return {
                            "content": x.content,
                            "name": x.name,
                            "mime_type": x.mime
                    }
                })
            }

            const response = await AxiosService.call({
                method: 'POST',
                header: {
                    Accept: "application/json",
                    "Content-Type":  "application/json",
                    Authorization: process.env.ZEPTO_TOKEN
                },
                path: `${process.env.ZEPTO_API_URL}/v1.1/email`,  // update
                body: {
                    "from":{
                        "address": fromEmail,
                        "name": fromName
                    },
                    "to": toList,
                    "reply_to": replies,
                    "subject": subject,
                    "textbody": html,
                    // "attachment": attach,

                }
            })

            await console.log('ZEPRESP', JSON.stringify(response, null, 2))

            callback(response)
        }
        
    }
}

export default new ZeptoTransport()