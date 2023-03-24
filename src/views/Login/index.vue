<template name="Login">
  <div class="warp">
    <div class="center_warp">
      <a-form
        :model="formState"
        name="basic"
        ref="ruleFormRef"
        autocomplete="off"
      >
        <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <a-input
            placeholder="账号: admin"
            v-model:value="formState.username"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password
            placeholder="密码: 123456"
            v-model:value="formState.password"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="onSubmit"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import request from '@/axios/index'
import { useUserInfo } from '@/piniaStore/module/user'

const { updateUserInfo } = useUserInfo()
const router = useRouter()
const formState: any = reactive({})

const goBack = () => {
  router.push('/')
}
const ruleFormRef = ref(null)
const onSubmit = async () => {
  ruleFormRef.value.validate().then(async res => {
    const { username, password } = formState
    // login
    request({
      url: '/frontend/authority/login',
      method: 'post',
      successMessage: '登录成功',
      data: { username, password },
      converter: ({ data }) => {
        updateUserInfo(data, () => {
          goBack()
        })
      }
    })
  })
}
</script>
<style scoped lang="less">
.warp {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/loginBanner.jpeg') no-repeat center;
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
