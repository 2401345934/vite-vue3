
<template name="Login">
  <div class="warp">
    <div class="center_warp">
      <a-form :model="formState" name="basic" ref="ruleFormRef" autocomplete="off">
        <a-form-item label="账号" name="userName" :rules="[{ required: true, message: '请输入账号!' }]">
          <a-input placeholder="账号: admin" v-model:value="formState.userName" />
        </a-form-item>
        <a-form-item label="密码" name="passWord" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password placeholder="密码: 123456" v-model:value="formState.passWord" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="onSubmit">登陆</a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { useStore } from "vuex";
import { message } from 'ant-design-vue';

const { commit, getters } = useStore();
const router = useRouter();
const formState: any = reactive({
});

const goBack = () => {
  router.push("/");
};
const ruleFormRef = ref(null);
const onSubmit = () => {
  ruleFormRef.value.validate().then((res) => {
    const { userName, passWord } = formState;
    if (userName === "admin" && passWord === "123456") {
      message.success('登录成功')
      commit("userInfo/setState", {
        userName: "admin",
        passWord: "123456",
        cb: () => {
          goBack();
        },
      });
    } else {
      message.error('账号或密码错误')
    }
  });
};
</script>
<style scoped lang="less">
.warp {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/loginBanner.jpeg") no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .center_warp {
    width: 600px;
    height: 400px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
</style>
