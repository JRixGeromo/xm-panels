<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/userlisting' }">All Users</el-breadcrumb-item>
    <el-breadcrumb-item>Create User</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row type="flex" justify="center">
    <el-col :span="24" :sm="{ span: 20 }" :md="{ span: 16 }">
      <UserForm
        :onSubmit="onSubmit"
        :resetForm="resetForm"
        :loading="creatingUser"
      />
    </el-col>
  </el-row>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import UserForm from '@/components/User/UserForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_USER } from '@/store/modules/user/actions-type';

export default {
  name: 'UserCrate',
  setup() {
    const store = useStore();
    return {
      creatingUser: computed(() => store.state.user.creatingUser),
      createUser: (userDetail) => store.dispatch(`user/${CREATE_USER}`, userDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          const userDetail = {
            ...form.model,
            secret: form.model.password,
            username: form.model.emailAddress,
            displayName: `${form.model.firstName} ${form.model.lastName}`,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.createUser(userDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    UserForm,
  },
};
</script>
