import { getTaskDetailApi } from '@/api/api'

export default {
    namespaced:true,
    state: {
        taskId: null,
        taskDetail:{},
    },
    mutations:{
        TASK_ID:(state, payload)=> {
            state.taskId = payload;
        },
        TASK_DETAIL:(state, payload)=>{
            state.taskDetail = payload;
        }
    },
    actions:{
        getTaskDetailApi({ commit }, payload){
            return getTaskDetailApi(payload).then(res=>{
                console.log('------------res detail----------------')
                console.log(res);
                commit('TASK_ID',res.data.data.id);
                commit('TASK_DETAIL', res.data.data);
            });
        }
    }
}