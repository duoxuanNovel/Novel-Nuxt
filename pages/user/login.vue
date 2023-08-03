<script setup lang="ts">
import {useUserStore} from "~/store/user";

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME,API_URL} = runtimeConfig.public

const router = useRouter() //路由跳转

const ruleFormRef = ref()
const ruleForm = ref({
  uname: '',
  pass: '',
})

const checkUname = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号！'))
  } else {
    if (value.length < 5 || value.length > 20) {
      callback(new Error('账号长度为5-20位！'))
    } else {
      callback()
    }
  }
}

const checkPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (value.length < 6 || value.length > 20) {
      callback(new Error('密码长度为6-20位！'))
    } else {
      callback()
    }
  }
}

const rules = ref({
  uname: [{ validator: checkUname, trigger: 'blur' }],
  pass: [{ validator: checkPass, trigger: 'blur' }],
})

const userStore = useUserStore()

const onSubmit = async () => {
  await ruleFormRef.value.validate()
  //请求登录接口
 const {data:userData} = await useFetch('/api/user/loginData', {
    method: 'POST',
    body: {
      userName: ruleForm.value.uname,
      passWord: ruleForm.value.pass,
    },
  })
  if (userData.value.code == 200){
    ElMessage({
      showClose: true,
      message: "登录成功,正在跳转...",
      type: 'success',
    })
    const userInfo = ref({
      uid: userData.value.data.uid,
      uname: userData.value.data.uname,
      email: userData.value.data.email,
    })
    //登录成功后存到本地
    await userStore.setUser(userInfo.value)
    //两秒后跳转 并加上过渡效果
    setTimeout(async () => {
      await router.push('/user/bookcase/')
    }, 1000)
  }else{
    ElMessage({
      showClose: true,
      message: userData.value.message,
      type: 'error',
    })
  }
}

definePageMeta({
  middleware: 'login',
})

useHead({
  title: `用户登录_${SITE_NAME}`,
  meta: [
    {
      name: 'keywords',
      content: `用户登录,${SITE_NAME},${SITE_NAME}登录`,
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供用户登录功能，有个人中心，书架，书签等功能。`,
    },
  ],
})
</script>

<template>
  <UserHeader />
  <div class="login">
    <el-form
        label-position="left"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
    >
      <el-form-item label="账号：" prop="uname">
        <el-input v-model="ruleForm.uname" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="pass">
        <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="onSubmit" class="login_btn">登录</el-button>
        <NuxtLink to="/user/register/">没有账号？马上注册</NuxtLink>
      </el-form-item>
    </el-form>
  </div>

  <CommonFooter />
</template>

<style scoped>
.login {
  min-height: 200px;
  margin: 30px 30px;
}

.login table {
  width: 100%;
}

.login table td {
  padding: 5px;
}

.login_btn {
  margin: 10px 0 30px;
  background: #017bb1;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  border: 0;
  color: #fff;
  width: 100%;
  border-radius: 3px;
}
</style>