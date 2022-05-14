import axios from 'axios';
// api.js 就是存放服务端的接口的；


const baseURL = '/api'

const getPostConfig = function () {
    return {
        baseURL,
        headers: {
            contentType:'application/json',
            authorization: sessionStorage.getItem('token')   // ''  
        }
    }
}


/**
 * @description 获取用户信息
 * **/
export const getUserInfoApi = function (payload = {}) {
    return axios.post('/user/info', payload, getPostConfig())
}


/**
 * @description 获取验证码
 * **/
export const getCaptchaApi = function () {
    return `${baseURL}/captcha?${Math.random()}`;
}

/**
 * @description 登录接口
 * @param payload <Object> 
 * @param payload.username   用户名
 * @param payload.password    密码
 * @param payload.captcha     验证码 
 * @author  bigC
 * **/
export const loginApi = function (payload = {}) {
    return axios.post('/user/login', payload,  getPostConfig())
}

/**
 * @description 退出登录
 * **/ 
export const logoutApi = function (payload = {}) {
    return axios.post('/user/logout', payload,  getPostConfig())
}

/**
 * @description 注册用户
 * @param payload <object>
 * @param payload.username   用户名
 * @param payload.password   密码
 * @param payload.phone      手机号
 * @param payload.email      邮箱
 * @param payload.captcha    验证码
 * **/ 
export const registerApi = function (payload = {}) {
    return axios.post('/user/register', payload,  getPostConfig())
}


/**
 * @description 获取题目列表
 * @param payload <object>
 * @param payload.type   题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param payload.pagination   非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 * @param payload.pageSize   非必填  每页获取几条数据  如果不传 默认是获取10条
 * @param payload.pageNum   非必填  想获取第几页的数据  如果不传 默认是第1页
 * **/ 
 export const getQuestionListApi = function (payload = {}) {
    return axios.post('/question/list', payload,  getPostConfig())
}

/**
 * @description 删除题;
 * @param payload <object>
 * @param payload.type 必填项 题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param payload.id   必填项 题目的id
 * **/ 
 export const deleteQuestionApi = function (payload = {}) {
    return axios.post('/question/delete', payload,  getPostConfig())
}

/**
 * @description 新增题;
 * @param payload <object>
 * @param payload.type 必填项 题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param payload.title 必填项 标题 
 * @param payload.questionA 必填项 选项A
 * @param payload.questionB 必填项 选项B
 * @param payload.questionC 必填项 选项C
 * @param payload.questionD 必填项 选项D
 * @param payload.answer 必填项 答案
 * @param payload.level 必填项 难度系数  1. 简单  2. 普通  3.困难
 * **/ 
 export const createQuestionApi = function (payload = {}) {
    return axios.post('/question/create', payload,  getPostConfig())
}

/**
 * @description 修改题;
 * @param payload <object>
 * @param payload.id   必填项 标识
 * @param payload.type 必填项 题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param payload.title 必填项 标题 
 * @param payload.questionA 必填项 选项A
 * @param payload.questionB 必填项 选项B
 * @param payload.questionC 必填项 选项C
 * @param payload.questionD 必填项 选项D
 * @param payload.answer 必填项 答案
 * @param payload.level 必填项 难度系数  1. 简单  2. 普通  3.困难
 * **/ 
 export const updateQuestionApi = function (payload = {}) {
    return axios.post('/question/update', payload,  getPostConfig())
}