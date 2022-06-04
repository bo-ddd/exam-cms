<template>
    <div @click="logout">
        <slot></slot>
    </div>
</template>

<script>
import user from '@/mixins/user'
export default {
    mixins:[ user ]
}
</script>