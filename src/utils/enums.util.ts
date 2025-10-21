export enum UserTypeEnum {
    SUPER = 'superadmin',
    ADMIN = 'admin',
    VENDOR = 'vendor',
    CUSTOMER = 'customer',
    DELIVERY = 'delivery',
    STAFF = 'staff',
    GUEST = 'guest',
    USER = 'user',
}

export enum VerifyTypeEnum {
    TOKEN = 'token',
    CODE = 'code'
}

export enum LoginMethodEnum {
    EMAIL = 'email',
    BIOMETRIC = 'biometric',
    SSO = 'sso',
    PLATFORM = 'platform',
}
export enum AppChannelEnum {
    WEB = 'web',
    MOBILE = 'mobile',
    WATCH = 'watch',
    DESKTOP = 'desktop',
}