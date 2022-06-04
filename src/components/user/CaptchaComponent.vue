<template>
    <div>
        <img :src="captchaSrc" alt="" @click="getCaptcha">
    </div>
</template>

<script>
import { getCaptchaApi } from '@/api/api';
export default {
    data(){
        return {
            captchaSrc:''
        }
    },
    created(){
        this.getCaptcha();
    },
    methods:{
        getCaptcha(){
            this.captchaSrc = getCaptchaApi();
        }
    }
}
</script>