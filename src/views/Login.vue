<template>
  <el-container class="login-container">
    <el-main class="login-body">
      <h1>Admin Panel - XM</h1>
      <el-form
        class="custom-form"
        label-position="top"
        label-width="100px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="secret">
          <el-input v-model="loginForm.secret" show-password></el-input>
        </el-form-item>
        <el-form-item class="button-wrapper">
          <el-button type="primary" @click="onSubmit" :loading="isSigningIn">Sign In</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { SIGN_IN } from '@/store/modules/auth/actions-type';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        secret: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please enter your username',
          },
          // {
          //   type: 'email',
          //   message: 'Please enter correct email address',
          // },
        ],
        secret: [
          {
            required: true,
            message: 'Please enter your password',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('auth', ['isSigningIn']),
  },
  methods: {
    ...mapActions('auth', [SIGN_IN]),
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loginDetails = {
            ...this.loginForm,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };

          this.SIGN_IN(loginDetails);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(223, 223, 223);
}

.login-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  max-width: 500px;
  -webkit-box-shadow: 0px 0px 19px -7px #000000;
  box-shadow: 0px 0px 19px -7px #000000;
  border-radius: 5px;
  background-color: white;
  margin: 0 15px;
}

.custom-form {
  width: 100%;
}
</style>
