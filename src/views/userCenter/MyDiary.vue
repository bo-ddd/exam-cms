<template>
  <div class="my-diary">
    <div class="aside">
      <div class="calendar">
        <el-title>日历</el-title>
        <el-calendar v-model="value"></el-calendar>
      </div>
      <div class="task">
        <el-title>今日任务</el-title>
        <div class="main">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A">
              <span>复选框 A</span>
              <el-link type="primary">当前进度：0%</el-link>
            </el-checkbox>
            <el-checkbox label="B">
              <span>复选框 B</span>
              <el-link type="primary">当前进度：0%</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="push">
        <el-title>推送</el-title>
        <div class="main">
          <div class="align-center">
            <span class="el-icon-edit-outline mr-10"></span>
            <div>
              <p class="tip">xxx给你发送了一条任务</p>
              <p class="time">description-timer</p>
            </div>
          </div>
          <el-button size="mini">立即领取</el-button>
          <span class="el-icon-eleme"></span>
        </div>
      </div>
      <div class="chat-room">
        <el-title>团队聊天</el-title>
        <div class="main">
          <div class="container" ref="scrollChat">
            <div v-for="(item, index) in chat" :key="index">
              <div class="info-item mine" v-if="userInfo.id == item.id">
                <div class="info">
                  {{ item.msg }}
                </div>
                <div class="avatar-img">
                  {{ item.avatarName.substring(0, 1) }}
                </div>
              </div>
              <div v-else class="info-item">
                <div class="avatar-img">
                  {{ item.avatarName.substring(0, 1) }}
                </div>
                <div class="info">
                  {{ item.msg }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <input
            type="text"
            placeholder="Type a message"
            class="ipt-send mr-5"
            v-model="chatInfo.msg"
          />
          <span class="el-icon-s-promotion" @click="sendSocketMsg"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

//mapState 
// mapState 是映射在 computed中的;
// mapActions  映射 在 methods方法的;
// 他们的使用的语法是一模一样的;
export default {
  data() {
    return {
      value: new Date(),
      checkList: [],
      chat: [],
      chatInfo: {
        id: "",
        type: 1, // 1.文字  2.图片
        avatarName: "",
        msg: "",
      },
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.code == "Enter") {
          this.sendSocketMsg();
          //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
          event.preventDefault();
        }
      },
      true
    );
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...++++++++");
      this.$socket.emit("addUser");
    },
    userCount: function (message) {
      console.log("服务端userCount返回的信息", message);
    },
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.chat.push(message);
      this.$nextTick(() => {
        let childNodes = this.$refs.scrollChat.childNodes;
        let lastIndex = childNodes.length - 1;
        Array.from(childNodes)[lastIndex].scrollIntoView(false);
      });
    },
    disconnect: function () {
      console.log("disconnect!");
      this.$socket.emit("removeUser");
    },
  },
  destroyed() {
    this.$socket.emit("removeUser");
  },
  methods: {
    // 辅助函数 mapActions 
    ...mapActions(['getUserInfoApi']),
    async getUserInfo() {
      this.userInfo = await this.getUserInfoApi();
      this.chatInfo.id = this.userInfo.id;
      this.chatInfo.avatarName = this.userInfo.avatarName;
    },
    sendSocketImg() {
      if (!this.chatInfo.msg) return;
      //接收服务端相对应的webdata数据
      //向服务端发送消息

      // let fr = new FileReader();
      // fr.readAsDataURL(file);
      // fr.onload = function(){
      //   console.log(fr.result);
      // }

      this.chatInfo.type = 2;
      this.$socket.emit("sendImg", this.chatInfo);
      this.chatInfo.msg = null;
    },
    sendSocketMsg() {
      if (!this.chatInfo.msg) return;
      //接收服务端相对应的webdata数据
      //向服务端发送消息
      this.chatInfo.type = 1;
      this.$socket.emit("sendMsg", this.chatInfo);
      this.chatInfo.msg = null;
    },
  },
};
</script>

<style scoped lang="scss">
.el-icon-edit-outline {
  font-size: 30px;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  background-color: #7c68b0;
}

::v-deep .el-checkbox-group {
  background-color: #fafafc;
  border-radius: 6px;
}
::v-deep .el-checkbox__label {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-checkbox {
  display: grid;
  grid-template-columns: 10px auto;
  align-items: center;
  padding: 10px;
  margin: 0;
}

::v-deep .el-calendar-day {
  height: calc(38px + 1vh);
}

.my-diary {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.aside {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px 0;
  .task {
    background: #fafafc;
  }
}

.push {
  background:#fff;
  .main {
    background-color: #58419b;
    border-radius: 10px;
    position: relative;
    padding:10px;
    margin:10px 15px;
    .tip {
      color: #fff;
      font-size: 18px;
      font-weight: 1000;
      padding: 6px 0;
    }
    .time {
      color: #d0c2ff;
    }
    & ::v-deep .el-icon-eleme {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;
      font-size: 100px;
      opacity: 0.3;
    }
    & ::v-deep .el-button {
      background-color: #fdcc7f;
      color: #fff;
      margin-left: 50px;
      margin-top: 10px;
    }
  }
}

.chat {
  .chat-room {
    height: calc(100% - 180px);
    display: grid;
    grid-template-rows: 52px auto 45px;
    overflow: hidden;
    .main {
      position: relative;
      border-radius: 10px 10px 0 0;
      background: #fafafc;
      overflow: scroll;
      .container {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        padding: 20px;
        overflow: scroll;
        & .info-item {
          display: flex;
          gap: 10px;
          align-items: center;
          margin: 20px 0;
          & .avatar-img {
            min-width: 40px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background: #7c68b0;
            color: #fff;
            font-size: 24px;
            text-align: center;
          }
          & .info {
            font-size: 14px;
            padding: 12px 15px;
            background: #fff;
            border-radius: 4px;
            word-break: break-all;
            box-sizing: border-box;
          }
        }
        & .mine {
          justify-content: flex-end;
          & .avatar-img {
            justify-self: right;
          }
          & .info {
            background: #edecfc;
          }
        }
      }
    }
    .footer {
      background: #fafafc;
      border-radius: 4px;
      display: grid;
      grid-template-columns: auto 45px;
      align-items: center;
      padding: 0 10px;
      .ipt-send {
        background: #fff;
        height: 40px;
        text-indent: 10px;
      }
      & ::v-deep .el-icon-s-promotion {
        color: #422e8f;
        justify-self: center;
        font-size: 24px;
      }
    }
  }
}
</style>