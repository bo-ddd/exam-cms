import {
    getUserInfoApi,
    updateUserInfoApi,
    logoutApi,
} from '@/api/api';

import session from '@/assets/utils/session';

export default {
    state: {
        userInfo: session.getItem('userInfo'),
        needGetUserInfo: true,
    },
    getters: {
    },
    mutations: {
        USERINFO: (state, payload) => {
            session.setItem('userInfo',payload);
            state.userInfo = payload;
        },
        NEED_GETUSERINFO: (state, payload) => {
            state.needGetUserInfo = payload;
        }
    },
    actions: {
        updateUserInfoApi({ commit, dispatch }, payload) {
            return updateUserInfoApi(payload).then(res => {
                // 因为用户信息修改了  所以我们要重新获取一下最新的用户信息;
                commit('NEED_GETUSERINFO', true);
                dispatch('getUserInfoApi')
                return res;
            })
        },
        getUserInfoApi({ state, commit }, payload) {
            if (state.needGetUserInfo) {
                return getUserInfoApi(payload).then(res => {
                    commit('USERINFO', res.data.data);
                    commit('NEED_GETUSERINFO', false);
                    return res.data.data;
                });
            } else {
                return state.userInfo;
            }
        },
        logoutApi() {
            return logoutApi();
        },
    },
}