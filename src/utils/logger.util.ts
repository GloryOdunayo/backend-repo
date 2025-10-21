
import colors from 'colors'
import { LogAPICallDTO, LogDirectDTO, LoggerDTO } from '../dtos/system.dto';
import { apiLogger, monitorLogger } from '../config/winston.config';

class Logger {

    constructor() { }

    /**
     * @name log
     * @param message 
     * @param options 
     */
    public log(message: string, options?: LoggerDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (options && options.type) {

            const { type, payload, className } = options;

            if (type === 'info') {

                if (display) {

                    if (className) {
                        console.log(`${className} - ${date} :: ${colors.blue(message)}`)
                    } else {
                        console.log(colors.blue(message))
                    }

                    if (payload) {
                        console.log(JSON.stringify(payload, null, 2))
                    }

                }

                if (monitor) {

                    monitorLogger.info(className ? className : message, {
                        message: message,
                        data: payload ? JSON.stringify(payload, null, 2) : null,
                        metadata: {
                            className: className ? className : 'LOG',
                            loggedAt: date
                        }
                    })

                }

            }

            if (type === 'error') {

                if (display) {

                    if (className) {
                        console.log(`${className} - ${date} :: ${colors.red(message)}`)
                    } else {
                        console.log(colors.red(message))
                    }

                    if (payload) {
                        console.log(JSON.stringify(payload, null, 2))
                    }

                }

                if (monitor) {
                    monitorLogger.info(className ? className : message, {
                        message: message,
                        data: payload ? JSON.stringify(payload, null, 2) : null,
                        metadata: {
                            className: className ? className : 'LOG',
                            loggedAt: date
                        }
                    })
                }

            }

            if (type === 'warning') {

                if (display) {

                    if (className) {
                        console.log(`${className} - ${date} :: ${colors.yellow(message)}`)
                    } else {
                        console.log(colors.yellow(message))
                    }

                    if (payload) {
                        console.log(JSON.stringify(payload, null, 2))
                    }

                }

                if (monitor) {
                    monitorLogger.info(className ? className : message, {
                        message: message,
                        data: payload ? JSON.stringify(payload, null, 2) : null,
                        metadata: {
                            className: className ? className : 'LOG',
                            loggedAt: date
                        }
                    })
                }

            }

            if (type === 'success') {

                if (display) {

                    if (className) {
                        console.log(`${className} - ${date} :: ${colors.green(message)}`)
                    } else {
                        console.log(colors.green(message))
                    }

                    if (payload) {
                        console.log(JSON.stringify(payload, null, 2))
                    }

                }

                if (monitor) {
                    monitorLogger.info(className ? className : message, {
                        message: message,
                        data: payload ? JSON.stringify(payload, null, 2) : null,
                        metadata: {
                            className: className ? className : 'LOG',
                            loggedAt: date
                        }
                    })
                }

            }

            if (type === 'any') {

                if (display) {

                    if (className) {
                        console.log(`${className} - ${date} :: ${colors.white(message)}`)
                    } else {
                        console.log(colors.white(message))
                    }

                    if (payload) {
                        console.log(JSON.stringify(payload, null, 2))
                    }

                }

                if (monitor) {
                    monitorLogger.info(className ? className : message, {
                        message: message,
                        data: payload ? JSON.stringify(payload, null, 2) : null,
                        metadata: {
                            className: className ? className : 'LOG',
                            loggedAt: date
                        }
                    })
                }

            }

        }

        else {

            if (display) {

                console.log(message);

                if (options && options.payload) {
                    console.log(JSON.stringify(options.payload, null, 2))
                }

            }

            if (monitor) {
                monitorLogger.info(options && options.className ? options.className : message, {
                    message: message,
                    data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                    metadata: {
                        className: options && options.className ? options.className : 'LOG',
                        loggedAt: date
                    }
                })
            }

        }

    }

    /**
     * @name info
     * @param message 
     * @param options 
     */
    public info(message: string, options?: LogDirectDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (display) {

            if (options && options.className) {
                console.log(`${options.className} - ${date} :: ${colors.blue(message)}`)
            } else {
                console.log(colors.blue(message))
            }

            if (options && options.payload) {
                console.log(JSON.stringify(options.payload, null, 2))
            }

        }

        if (monitor) {

            monitorLogger.info(options && options.className ? options.className : message, {
                message: message,
                data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                metadata: {
                    className: options && options.className ? options.className : 'LOG',
                    loggedAt: date
                }
            })

        }
    }

    /**
     * @name error
     * @param message 
     * @param options 
     */
    public error(message: string, options?: LogDirectDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (display) {

            if (options && options.className) {
                console.log(`${options.className} - ${date} :: ${colors.red(message)}`)
            } else {
                console.log(colors.red(message))
            }

            if (options && options.payload) {
                console.log(JSON.stringify(options.payload, null, 2))
            }

        }

        if (monitor) {
            monitorLogger.error(options && options.className ? options.className : message, {
                message: message,
                data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                metadata: {
                    className: options && options.className ? options.className : 'LOG',
                    loggedAt: date
                }
            })
        }
    }

    /**
     * @name warning
     * @param message 
     * @param options 
     */
    public warning(message: string, options?: LogDirectDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (display) {

            if (options && options.className) {
                console.log(`${options.className} - ${date} :: ${colors.yellow(message)}`)
            } else {
                console.log(colors.yellow(message))
            }

            if (options && options.payload) {
                console.log(JSON.stringify(options.payload, null, 2))
            }

        }

        if (monitor) {
            monitorLogger.warning(options && options.className ? options.className : message, {
                message: message,
                data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                metadata: {
                    className: options && options.className ? options.className : 'LOG',
                    loggedAt: date
                }
            })
        }
    }

    /**
     * @name success
     * @param message 
     * @param options 
     */
    public success(message: string, options?: LogDirectDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (display) {

            if (options && options.className) {
                console.log(`${options.className} - ${date} :: ${colors.green(message)}`)
            } else {
                console.log(colors.green(message))
            }

            if (options && options.payload) {
                console.log(JSON.stringify(options.payload, null, 2))
            }

        }

        if (monitor) {
            monitorLogger.debug(options && options.className ? options.className : message, {
                message: message,
                data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                metadata: {
                    className: options && options.className ? options.className : 'LOG',
                    loggedAt: date
                }
            })
        }
    }

    /**
     * @name any
     * @param message 
     * @param options 
     */
    public any(message: string, options?: LogDirectDTO) {

        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const monitor = options && options.monitor ? true : false;
        const display = options && options.display !== undefined ? options.display : true;

        if (display) {

            if (options && options.className) {
                console.log(`${options.className} - ${date} :: ${colors.white(message)}`)
            } else {
                console.log(colors.white(message))
            }

            if (options && options.payload) {
                console.log(JSON.stringify(options.payload, null, 2))
            }

        }

        if (monitor) {
            monitorLogger.log(options && options.className ? options.className : message, {
                message: message,
                data: options && options.payload ? JSON.stringify(options.payload, null, 2) : null,
                metadata: {
                    className: options && options.className ? options.className : 'LOG',
                    loggedAt: date
                }
            })
        }
    }

    /**
     * @name api
     * @param data 
     */
    public async api(data: LogAPICallDTO): Promise<void> {

        const { provider, name, isError = false } = data;

        let payload = null;

        if (data.payload && typeof (data.payload) === 'object') {
            payload = JSON.stringify(data.payload, null, 2)
        }

        // trigger log stream
        if (isError) {
            apiLogger.error(`${name}`, {
                provider: provider,
                data: payload
            })
        } else {
            apiLogger.info(`${name}`, {
                provider: provider,
                data: payload
            })
        }

    }

}

export default new Logger()