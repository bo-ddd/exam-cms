<template>
  <div class="chat">
    <div v-for="(data, index) in chatList" :key="index">
      <div v-if="userInfo.id == data.id">
        <div class="item main">是每一条消息 小王</div>
      </div>
      <div class="item" v-else>
        <div>小张：是每一条消息</div>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data() {
    return {
      userInfo: {
        id: 1,
      },
      chatList: [
        {
          id: 1,
          msg: "hello world",
        },
        {
          id: 2,
          msg: "这是别人发的消息",
        },
        {
          id: 1,
          msg: "hello world222",
        },
        {
          id: 2,
          msg: "这是别人发的消息222222222222",
        },
      ],
    };
  },
};
</script>

<style scoped>
.chat {
  width: 400px;
  margin: 0 auto;
  border: 1px solid red;
}

.chat .item {
  display: flex;
}

.chat .main {
  flex-direction: row-reverse;
}
</style>