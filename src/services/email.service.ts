import { sendEmailDTO, sendEmailWithSGDTO, sendWithZeptoDTO } from "../dtos/email.dto";
import { name, renderFile } from "ejs";
import appRootPath from "app-root-path";
import sendgrid from "../utils/sendgrid.util";
import zepto from "../utils/zepto.util";
import { IResult } from "../utils/interfaces.util";

class EmailService {
  constructor() {}

  /**
   * @name sendEmailWithSG
   * @description send email with send grid transporter and ejs/hbs
   * @param data 
   */
  private async sendEmailWithSG(data: sendEmailWithSGDTO): Promise<void> {
    const sourceUrl = `${appRootPath.path}/src`;

    if(data.engine === 'ejs'){
        renderFile(
          `${sourceUrl}/views/ejs/${data.template}.ejs`,
          {
            email: data.email,
            emailTitle: data.emailTitle,
            preheaderText: data.preheaderText,
            emailSalute: data.emailSalute,
            contentOne: data.contentOne,
            contentTwo: data.contentTwo,
            contentThree: data.contentThree,
            buttonText: data.buttonText,
            buttonUrl: data.buttonUrl,
          },
          {},
    
          async (error, html) => {
            try {
              const mailData: any = {
                apiKey: process.env.SENDGRID_API_KEY || "",
                to: data.email,
                from: `${
                  data.fromName ? data.fromName : process.env.EMAIL_FROM_NAME
                } <${process.env.EMAIL_FROM_EMAIL}>`,
                subject: data.emailTitle,
                text: "email",
                html: html,
              };
    
              if (data.replyTo) {
                mailData.replyTo = data.replyTo;
              }
    
              sendgrid.send(mailData, (res: any) => {
                // console.log(res, "send grid error");
              });
            } catch (err) {
              console.log(err, "Sender error");
            }
          }
        );
    }
  }

  /**
   * @name sendWithZepto
   * @description send email with zepto transporter and ejs/hbs
   * @param data 
   */
  private async sendWithZepto(data: sendWithZeptoDTO): Promise<void>{
    const sourceUrl = `${appRootPath.path}/src`;

    if(data.engine === 'ejs'){
        renderFile(
          `${sourceUrl}/views/ejs/${data.template}.ejs`,
          {
            email: data.email,
            emailTitle: data.emailTitle,
            preheaderText: data.preheaderText,
            emailSalute: data.emailSalute,
            contentOne: data.contentOne,
            contentTwo: data.contentTwo,
            contentThree: data.contentThree,
            buttonText: data.buttonText,
            buttonUrl: data.buttonUrl,
          },
          {},
    
          async (error, html) => {
            try {
              const mailData:any = {
                to: [{email: data.email, name: ""}],
                fromEmail: process.env.ZEPTO_FROM_EMAIL,
                fromName: `${data.fromName? data.fromName : process.env.EMAIL_FROM_NAME}`,
                subject: data.emailTitle,
                text: 'email',
                html: html,
                replyTo: data.replyTo ? [{email: data.replyTo, name: ""}]: []
              } 

              zepto.send(mailData, (res: IResult)=>{
                console.log('zepto', res)
              })
            } catch (err) {
              console.log(err, "Zepto error");
            }
          }
        );
    }
  }

  /**
   * @name sendTokenVerifyEmail
   * @param data 
   */
  public async sendTokenVerifyEmail(data: sendEmailDTO): Promise<void>{

    const { driver, email, title, replyTo, options } = data;

    let template = data.template? data.template : 'verify_token';
    let fromName = data.fromName? data.fromName : process.env.EMAIL_FROM_NAME || "Gee";
    let preheader = data.preheader? data.preheader : title;
    let salute = options.salute? options.salute : 'Champ';
    let text = options.buttonText? options.buttonText : 'Verify';
    let url = options.buttonUrl? options.buttonUrl : '';

    if(driver === 'sendgrid'){
        this.sendEmailWithSG({
            engine: 'ejs',
            email: email,
            fromEmail: process.env.EMAIL_FROM_EMAIL|| "",
            fromName: fromName,
            preheaderText: preheader,
            emailSalute: salute,
            emailTitle: title,
            template: template,
            buttonText: text,
            buttonUrl: url,

        })
    }

    if(driver === 'zepto'){
        this.sendWithZepto({
            engine: 'ejs',
            email: email,
            fromEmail: process.env.EMAIL_FROM_EMAIL|| "",
            fromName: fromName,
            preheaderText: preheader,
            emailSalute: salute,
            emailTitle: title,
            template: template,
            buttonText: text,
            buttonUrl: url,

        })
    }
  }
  /**
   * @name sendOTPVerifyEmail
   * @param data 
   */
  public async sendOTPVerifyEmail(data: sendEmailDTO): Promise<void>{

    const { driver, email, title, replyTo, options } = data;

    let template = data.template? data.template : 'verify_otp';
    let fromName = data.fromName? data.fromName : process.env.EMAIL_FROM_NAME || "Gee";
    let preheader = data.preheader? data.preheader : title;
    let salute = options.salute? options.salute : 'Champ';
    let code = options.code? options.code : '000000';

    if(driver === 'sendgrid'){
        this.sendEmailWithSG({
            engine: 'ejs',
            email: email,
            fromEmail: process.env.EMAIL_FROM_EMAIL|| "",
            fromName: fromName,
            preheaderText: preheader,
            emailSalute: salute,
            emailTitle: title,
            template: template,
            code: code,
        })
    }

    if(driver === 'zepto'){
        this.sendWithZepto({
            engine: 'ejs',
            email: email,
            fromEmail: process.env.EMAIL_FROM_EMAIL|| "",
            fromName: fromName,
            preheaderText: preheader,
            emailSalute: salute,
            emailTitle: title,
            template: template,
            code: code,
        })
    }
  }
}

export default new EmailService();
