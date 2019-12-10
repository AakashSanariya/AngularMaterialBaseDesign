const BASE_URL = 'http://api.basestructure.com/';
const API = 'api/';
const VERSION = 'v1/';

export const AppConfig = {

    EncrDecrKey:'123456$#@$^@1ERF',

    userSignin: BASE_URL + API + VERSION + 'oauth/signin',

    /* Dashboard */
    totalUser: BASE_URL + API + 'subadmin/list',

    /* Manage Sub Admin */
    listSubAdmin: BASE_URL + API + 'subadmin/list'
};
