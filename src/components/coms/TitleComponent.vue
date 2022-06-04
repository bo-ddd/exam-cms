<template>
        <h1 class="title" :class="icon">
            <span :class="fontSize">
                <slot></slot>
            </span>
            <span class="desc fs-14">
                <slot name="desc"></slot>
            </span>
        </h1>
</template>

<script>
export default {
    props:['icon','level'],
    computed:{
        fontSize(){
            let res = '';
            switch(this.level){
                case '1' :
                    res = 'fs-20'
                    break;
                case '2' :
                    res = 'fs-18'
                    break;
                case '3' :
                    res = 'fs-16';
                    break;
                case '4' :
                    res = 'fs-14';
                    break;
                default :
                    res = 'fs-20'
                    break;
            }
            return res;
        }
    }
}
</script>

<style scoped>
.title{
    padding:12px 15px;
    font-size:20px;
    font-weight: normal;
    color:rgba(0, 0, 0, .8);
    background:#fff;
}

.desc{
    color:rgba(0, 0, 0, .7);
}
</style>