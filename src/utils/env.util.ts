import { config } from "dotenv";
import { systemLogger } from "../config/winston.config";

config()

class ENV {

    public isDev: boolean;
    public isStaging: boolean;
    public isProd: boolean;

    public NODE_ENV: string;
    public APP_ENV: string;
    public PORT: string;
    public API_ROUTE: string;
    public LOGS_PATH: string;
    public APP_CHANNELS: string;
    public MONGODB_URI: string;
    public REDIS_HOST: string;
    public REDIS_PORT: string;
    public REDIS_USER: string;
    public REDIS_PASSWORD: string;
    public JWT_SECRET: string;
    public JWT_EXPIRE: string;
    public JWT_COOKIE_EXPIRE: string;
    public SENDGRID_API_KEY: string;
    public EMAIL_FROM_EMAIL: string;
    public ZEPTO_API_URL: string;
    public ZEPTO_TOKEN: string;
    public ZEPTO_MAIL_ALIAS: string;
    public ZEPTO_FROM_EMAIL: string;
    public EMAIL_FROM_NAME: string;
    public EMAIL_DRIVER: string;
    public SUPERADMIN_EMAIL: string;
    public CUSTOMER_APP_URL: string;

    constructor() {

        if (!process.env.NODE_ENV) {
            throw new Error('NODE_ENV is not defined')
        }

        if (!process.env.APP_ENV) {
            throw new Error('APP_ENV is not defined')
        }

        if (!process.env.PORT) {
            throw new Error('PORT is not defined')
        }

        if (!process.env.API_ROUTE) {
            throw new Error('API_ROUTE is not defined')
        }

        if (!process.env.APP_CHANNELS) {
            throw new Error('APP_CHANNELS is not defined')
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined')
        }

        if (!process.env.REDIS_HOST) {
            throw new Error('REDIS_HOST is not defined')
        }

        if (!process.env.REDIS_PORT) {
            throw new Error('REDIS_PORT is not defined')
        }

        if (!process.env.REDIS_USER) {
            throw new Error('REDIS_USER is not defined')
        }

        if (!process.env.REDIS_PASSWORD) {
            throw new Error('REDIS_PASSWORD is not defined')
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined')
        }

        if (!process.env.JWT_EXPIRE) {
            throw new Error('JWT_EXPIRE is not defined')
        }

        if (!process.env.JWT_COOKIE_EXPIRE) {
            throw new Error('JWT_COOKIE_EXPIRE is not defined')
        }

        if (!process.env.SENDGRID_API_KEY) {
            throw new Error('SENDGRID_API_KEY is not defined')
        }

        if (!process.env.EMAIL_FROM_EMAIL) {
            throw new Error('EMAIL_FROM_EMAIL is not defined')
        }

        if (!process.env.ZEPTO_API_URL) {
            throw new Error('ZEPTO_API_URL is not defined')
        }

        if (!process.env.ZEPTO_TOKEN) {
            throw new Error('ZEPTO_TOKEN is not defined')
        }

        if (!process.env.ZEPTO_MAIL_ALIAS) {
            throw new Error('ZEPTO_MAIL_ALIAS is not defined')
        }

        if (!process.env.ZEPTO_FROM_EMAIL) {
            throw new Error('ZEPTO_FROM_EMAIL is not defined')
        }

        if (!process.env.EMAIL_FROM_NAME) {
            throw new Error('EMAIL_FROM_NAME is not defined')
        }

        if (!process.env.EMAIL_DRIVER) {
            throw new Error('EMAIL_DRIVER is not defined')
        }

        if (!process.env.SUPERADMIN_EMAIL) {
            throw new Error('SUPERADMIN_EMAIL is not defined')
        }

        if (!process.env.CUSTOMER_APP_URL) {
            throw new Error('CUSTOMER_APP_URL is not defined')
        }

        this.NODE_ENV = process.env.NODE_ENV;
        this.APP_ENV = process.env.APP_ENV;
        this.PORT = process.env.PORT;
        this.API_ROUTE = process.env.API_ROUTE;
        this.APP_CHANNELS = process.env.APP_CHANNELS;
        this.MONGODB_URI = process.env.MONGODB_URI;
        this.REDIS_HOST = process.env.REDIS_HOST;
        this.REDIS_PORT = process.env.REDIS_PORT;
        this.REDIS_USER = process.env.REDIS_USER;
        this.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRE = process.env.JWT_EXPIRE;
        this.JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE;
        this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        this.EMAIL_FROM_EMAIL = process.env.EMAIL_FROM_EMAIL;
        this.ZEPTO_API_URL = process.env.ZEPTO_API_URL;
        this.ZEPTO_TOKEN = process.env.ZEPTO_TOKEN;
        this.ZEPTO_MAIL_ALIAS = process.env.ZEPTO_MAIL_ALIAS;
        this.ZEPTO_FROM_EMAIL = process.env.ZEPTO_FROM_EMAIL;
        this.EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME;
        this.EMAIL_DRIVER = process.env.EMAIL_DRIVER;
        this.SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;
        this.CUSTOMER_APP_URL = process.env.CUSTOMER_APP_URL;
        this.LOGS_PATH = process.env.LOGS_PATH || 'logs';

        this.isDev = process.env.APP_ENV === 'development' ? true : false;
        this.isStaging = process.env.APP_ENV === 'staging' ? true : false;
        this.isProd = process.env.APP_ENV === 'production' ? true : false;

    }

}

export default new ENV();