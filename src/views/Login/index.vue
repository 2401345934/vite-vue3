
<template name="Login">
  <h1>登录</h1>
  <el-form ref="ruleFormRef" :model="state.form" :rules="rules" label-width="120px">
    <el-form-item label="账号" prop="userName">
      <el-input v-model="state.form.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
      <el-input v-model="state.form.passWord"></el-input>
    </el-form-item>
    <el-form-item>
      <a-button type="primary" @click="onSubmit">登录</a-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const { commit, getters } = useStore();
const router = useRouter();
const state: any = reactive({
  form: {},
});

const goBack = () => {
  router.push("/");
};
const ruleFormRef = ref(null);
const rules: any = reactive({
  userName: [{ required: true, message: "请输入账号" }],
  passWord: [{ required: true, message: "请输入密码" }],
});

const onSubmit = () => {
  ruleFormRef.value.validate().then((res) => {
    const { userName, passWord } = state.form;
    if (userName === "admin" && passWord === "123456") {
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      commit("userInfo/setState", {
        userName: "admin",
        passWord: "123456",
        cb: () => {
          goBack();
        },
      });
    } else {
      ElMessage({
        message: "账号或密码错误",
        type: "error",
      });
    }
  });
};
</script>
<style scoped>
</style>
