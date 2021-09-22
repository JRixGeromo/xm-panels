<template>
  <el-container class="login-container">
    <div>
      <h1 style="color: #FFFFFF;text-align: center;">WELCOME TO XM STUDIOS ADMIN PANEL!</h1>
      <el-main class="login-body">
        <el-form
          class="custom-form"
          label-position="top"
          label-width="100px"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          @keyup.enter="onSubmit"
        >
          <TextInput
            v-model="loginForm.username"
            formProps="username"
            formLabel="Username"
          />
          <TextInput
            v-model="loginForm.secret"
            inputType="password"
            formProps="secret"
            formLabel="Password"
          />
          <el-form-item class="button-wrapper">
            <el-button
              class="custom-btn add-btn"
              style="position: unset;"
              @click="onSubmit"
              :loading="isSigningIn"
            >
              Sign In
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import { SIGN_IN } from '@/store/modules/auth/actions-type';
import { mapActions, mapState } from 'vuex';
import TextInput from '@/components/Share/TextInput.vue';

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
  components: {
    TextInput,
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
}

.custom-form {
  width: 100%;
}
</style>
