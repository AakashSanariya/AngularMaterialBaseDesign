const BASE_URL = 'http://api.baselumen.demo.brainvire.com/';
const API = 'api/';
const VERSION = 'admin/api/v1/';

export const AppConfig = {

    EncrDecrKey:'123456$#@$^@1ERF',

    /* Login */
    userSignin: BASE_URL + VERSION + 'oauth/signin',
    forgotPassword: BASE_URL + VERSION + 'oauth/password/forgot',

    /* Dashboard */
    totalUser: BASE_URL + API + 'subadmin/list',

    /* Manage Sub Admin */
    listSubAdmin: BASE_URL + API + 'subadmin/list',
    activateRole: BASE_URL + API + 'role/list_active/0',
    filterSubadmin: BASE_URL + API + 'user/list',
    changeSubAdminStatus: BASE_URL + API + 'subadmin/change_status',
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

    /* Category Management*/
    getallCategory: BASE_URL + API + 'category/list',
    changeCategoryStatus: BASE_URL + API + 'category/change_status',
    deleteCategoryById: BASE_URL + API + 'category/delete/',
    findCategoryById: BASE_URL + API + 'category/show/',
    findParentCategory: BASE_URL + API + 'category/parent_list/',
    updateCategory: BASE_URL + API + 'category/update/',
    createCategory: BASE_URL + API + 'category/create',
    getCategoryTreeView: BASE_URL + API + 'category/treeview/ng6',

    /* Email Template Management*/
    getAllEmailTemplate: BASE_URL + API + 'email_template/list',
    getEmailTemplateById: BASE_URL + API + 'email_template/show/',
    updateEmailTemplate: BASE_URL + API + 'email_template/update/',

    /* Faq Management*/
    getAllFaq: BASE_URL + API + 'faq/list',
    changeFaqStatus: BASE_URL + API + 'faq/change_status',
    deleteFaq: BASE_URL + API + 'faq/delete/',
    getFaqById: BASE_URL + API + 'faq/show/',
    getFaqTopicList: BASE_URL + API + 'faq_topic/list',
    updateFaq: BASE_URL + API + 'faq/update/',
    createNewFaq: BASE_URL + API + 'faq/create',

    /* Role And Permission MAnagement */
    getAllRoleList: BASE_URL + API + 'role/list',
    getAllPermissionList: BASE_URL + API + 'permission/list',
    assignPermission: BASE_URL + API + 'permission/role_assign/',
    changeRoleStatus: BASE_URL + API + 'role/change_status',
    updateRole: BASE_URL + API + 'role/update/',
    addNewRole: BASE_URL + API + 'role/create',

    /* Settings Management*/
    getImageData: BASE_URL + API + VERSION + 'config/logo',
    getSettingData: BASE_URL + API + 'configuration/list',
    saveSettingData: BASE_URL + API + 'configuration/update',

    /* Login User Profile */
    getUserProfile: BASE_URL + VERSION + 'user/profile',
    updateUserProfile: BASE_URL + API + 'subadmin/update_profile',
    changePassword: BASE_URL + API + VERSION + 'oauth/password/change',
};

