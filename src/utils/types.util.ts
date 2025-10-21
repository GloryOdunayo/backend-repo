export type ErrorType = Array<string> | Array<number> | Array<{ message: string, field: string }>;
export type UserType = 'superadmin' | 'vendor' | 'admin' | 'customer' | 'guest' | 'staff' | 'user';
export type EmailDriver = 'sendgrid' | 'aws' | 'sendchamp' | 'mailtrap' | 'zepto' | 'brevo';
export type HTTPMethodType =  'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
export type LoginMethodType = 'email' | 'biometric' | 'sso' | 'platform';
export type LogType = 'info' | 'warning' | 'success' | 'error' | 'any';
export type ProviderType = 'aws' | 'paystack' | 'zepto' | 'sengrid'