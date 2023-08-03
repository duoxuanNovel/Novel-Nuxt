<script setup lang="ts">
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const router = useRouter() //路由跳转

const ruleFormRef = ref()
const ruleForm = ref({
  uname: '',
  pass: '',
  repass: '',
  email: '',
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

const checkRePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'))
  } else if (value !== ruleForm.value.pass) {
    callback(new Error('两次输入密码不一致！'))
  } else {
    callback()
  }
}

const checkEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱！'))
  } else {
    if (!value.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/)) {
      callback(new Error('邮箱格式不正确！'))
    } else {
      callback()
    }
  }
}

const rules = ref({
  uname: [{ validator: checkUname, trigger: 'blur' }],
  pass: [{ validator: checkPass, trigger: 'blur' }],
  repass: [{ validator: checkRePass, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
})

const onSubmit = async () => {
  await ruleFormRef.value.validate()
  //请求登录接口
  const {data:userData} = await useFetch('/api/user/regData', {
    method: 'POST',
    body: {
      userName: ruleForm.value.uname,
      passWord: ruleForm.value.pass,
      email: ruleForm.value.email,
    },
  })
  if (userData.value.code == 200){
    ElMessage({
      showClose: true,
      message: "注册成功,正在跳转...",
      type: 'success',
    })
    setTimeout(() => {
      router.push('/user/login/')
    }, 1000)
  }else{
    ElMessage({
      showClose: true,
      message: userData.value.message + "请更换信息后重试！",
      type: 'error',
    })
  }
}

useHead({
  title: `用户注册_${SITE_NAME}`,
  meta: [
    {
      name: 'keywords',
      content: `用户注册,${SITE_NAME},${SITE_NAME}注册`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供用户注册功能，有个人中心，书架，书签等功能。`
    }
  ],
})
</script>

<template>
  <UserHeader/>
  <div class="login">
    <el-form
        label-position="left"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
        label-width="90px"
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
      <el-form-item label="重复密码：" prop="repass">
        <el-input
            v-model="ruleForm.repass"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input
            v-model="ruleForm.email"
            type="email"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="onSubmit" class="login_btn">注册</el-button>
        <NuxtLink to="/user/login/">已有账号？马上登录</NuxtLink>
      </el-form-item>
    </el-form>

  </div>
  <CommonFooter />
</template>

<style scoped>
.login {
  min-height: 200px;
  margin: 20px 30px;
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