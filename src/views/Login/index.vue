
<template name="Login">
  <a-form :model="formState" name="basic" ref="ruleFormRef" autocomplete="off">
    <a-form-item
      label="Username"
      name="userName"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.userName" />
    </a-form-item>
    <a-form-item
      label="Password"
      name="passWord"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.passWord" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="onSubmit">Submit</a-button>
    </a-form-item>
  </a-form>
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
<style scoped>
</style>
