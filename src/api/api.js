import axios from 'axios';
import {  Message }  from 'element-ui';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers.authorization = sessionStorage.getItem('token');
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 接口返回401
    if (response.data.status == 401) {
        window.location.href = '/';
        return Promise.reject('401');
    }else if( response.data.status !== 1){
        Message({
            type:'warning',
            message:response.data.msg
        })
        return Promise.reject(response.data.msg);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Message({
        type:'warning',
        message:'网络错误,请稍候在试!'
    })
    return Promise.reject(error);
});

const baseURL = '/api';

const postConfig = {
    baseURL,
    headers: {
        contentType: 'application/json',
    }
}

/**
 * @description 获取用户信息
 * **/
export const getUserInfoApi = function (payload = {}) {
    return axios.post('/user/info', payload, postConfig)
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
    return axios.post('/user/login', payload, postConfig)
}

/**
 * @description 退出登录
 * **/
export const logoutApi = function (payload = {}) {
    return axios.post('/user/logout', payload, postConfig)
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
    return axios.post('/user/register', payload, postConfig)
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
    return axios.post('/question/list', payload, postConfig)
}

/**
 * @description 删除题;
 * @param payload <object>
 * @param payload.type 必填项 题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选
 * @param payload.id   必填项 题目的id
 * **/
export const deleteQuestionApi = function (payload = {}) {
    return axios.post('/question/delete', payload, postConfig)
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
    return axios.post('/question/create', payload, postConfig)
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
    return axios.post('/question/update', payload, postConfig)
}

/**
 * @description 修改用户信息;
 * @param payload <object>
 * @param payload.avatarName <string>  昵称
 * @param payload.name <string> 真实姓名
 * @param payload.sex <number> 性别  1 : 男  0：女 
 * @param payload.provinceNo  <string> 省编号
 * @param payload.cityNo <string> 市编号
 * @param payload.areaNo <string> 区编号
 * @param payload.desc <string> 个人介绍
 * **/
export const updateUserInfoApi = function (payload = {}) {
    return axios.post('/user/update', payload, postConfig)
}

/**
 * @description 获取用户列表
 * **/
export const getUserListApi = function (payload = {}) {
    return axios.post('/user/list', payload, postConfig);
}

/**
 * @description 创建任务
 * @param payload 
 * @param payload.name 任务名称
 * @param payload.desc 任务描述
 * @param payload.duration 任务时长
 * @param payload.level  任务是否紧急 1： 紧急  0：普通
 * **/
export const createTaskApi = function (payload = {}) {
    return axios.post('/task/create', payload, postConfig);
}

/**
 * @description 发布任务
 * @param payload
 * @param payload.userId  //<array[<number>]>  用户ID的集合
 * @param payload.taskId  //任务id;
 * **/
export const releaseTaskApi = function (payload = {}) {
    return axios.post('/task/release', payload, postConfig);
}

/**
 * @description 获取任务列表
 * **/
export const getTaskListApi = function (payload = {}) {
    return axios.post('/task/list', payload, postConfig);
}

/**
 * @description 获取角色组列表
 * **/
export const getRoleGroupListApi = function (payload = { pagination: false }) {
    return axios.post('/roleGroup/list', payload, postConfig);
}

/**
 * @description 获取角色列表
 * **/
export const getRoleListApi = function (payload = { pagination: false }) {
    return axios.post('/role/list', payload, postConfig);
}