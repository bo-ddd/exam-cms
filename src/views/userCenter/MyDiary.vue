<template>
  <div class="my-diary">
    <div class="aside">
      <div class="calendar">
        <h1 class="title">日历</h1>
        <el-calendar v-model="value"></el-calendar>
      </div>
      <div class="task">
        <h1 class="title">今日任务</h1>
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
        <h1 class="title">推送</h1>
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
        <h1 class="title">团队聊天</h1>
        <div class="main">
          <div class="container">
            <div class="info-item">
              <div class="avatar-img">G</div>
              <div class="info">
                我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容
              </div>
            </div>
            <div class="info-item mine">
              <div class="info">
                我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容
              </div>
              <div class="avatar-img">G</div>
            </div>
            <div class="info-item mine">
              <div class="info">
                我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容
              </div>
              <div class="avatar-img">G</div>
            </div>
            <div class="info-item mine">
              <div class="info">
                我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容我是消息内容
              </div>
              <div class="avatar-img">G</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <input
            type="text"
            placeholder="Type a message"
            class="ipt-send mr-5"
          />
          <span class="el-icon-s-promotion"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      checkList: [],
    };
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
}

.aside {
  display: grid;
  grid-template-rows: auto 1fr;
  .task {
    .main {
      padding: 12px 20px;
    }
  }
}

.title {
  padding: 15px 0;
}

.push {
  .main {
    background-color: #58419b;
    padding: 15px;
    border-radius: 10px;
    position: relative;
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
      border-radius: 10px;
      background: #fafafc;
      padding: 20px;
      box-sizing: border-box;
      overflow: scroll;
      .container {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        overflow: scroll;
        & .info-item {
          display: grid;
          grid-template-columns: 50px auto;
          margin: 20px 0;
          & .avatar-img {
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
            background: #fff;
            border-radius: 4px;
            line-height: 40px;
          }
        }
        & .mine {
          grid-template-columns: auto 50px;
          & .avatar-img {
            justify-self: right;
          }
        }
      }
    }
      .footer {
        background: #fff;
        border-radius: 4px;
        display: grid;      
        grid-template-columns: auto 45px;
        align-items: center;
        padding: 0 10px;
        .ipt-send {
          background: #fff;
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