const BASE_URL = 'http://api.basestructure.com/';
const API = 'api/';
const VERSION = 'v1/';

export const AppConfig = {

    EncrDecrKey:'123456$#@$^@1ERF',

    userSignin: BASE_URL + API + VERSION + 'oauth/signin',

    /* Dashboard */
    totalUser: BASE_URL + API + 'subadmin/list',

    /* Manage Sub Admin */
    listSubAdmin: BASE_URL + API + 'subadmin/list',
    activateRole: BASE_URL + API + 'role/list_active/0',
    filterSubadmin: BASE_URL + API + 'user/list',
    changeSubAdminStatus: BASE_URL + API + '/subadmin/change_status',
    subAdminByID: BASE_URL + API + 'subadmin/show/',
    addNewSubadmin: BASE_URL + API + 'subadmin/create',
    editSubAdmin: BASE_URL + API + 'subadmin/update/',
    subadminPasswordChange: BASE_URL + API + 'subadmin/password/change',
    deleteSubAdmin: BASE_URL + API + 'subadmin/delete/',


    /* Manage User */
    getManageUserList: BASE_URL + API + 'user/list',
    changeManageUserStatus: BASE_URL + API + 'user/change_status',
    changeManageUserPassword: BASE_URL + API + 'user/password/change',
    deleteManageUser: BASE_URL + API + 'user/delete/',
    addNewManageUser: BASE_URL + API + 'user/create',
    findUserById: BASE_URL + API + 'user/show/',
    updateUser: BASE_URL + API + 'user/update/',

    /* CMS Management */
    getAllCmsList: BASE_URL + API + 'content_page/list',
    changeCmsStauts: BASE_URL + API + 'content_page/change_status',
    getCmsById: BASE_URL + API + 'content_page/show/',
    addCms: BASE_URL + API + 'content_page/create',
    updateCms: BASE_URL + API + 'content_page/update/',
};

