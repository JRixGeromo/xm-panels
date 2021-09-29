<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="userForm"
    :rules="rules"
    ref="userForm"
    @keyup.enter="onSubmit($refs.userForm)"
  >
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="userForm.firstName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="userForm.lastName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Email" prop="emailAddress">
      <el-input v-model="userForm.emailAddress"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="userForm.password"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="confirm_password">
      <el-input type="password" v-model="userForm.confirm_password"></el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-select v-model="userForm.role" placeholder="Select">
        <el-option
          v-for="role in roleList"
          :key="role.roleId"
          :label="role.roleName"
          :value="role.roleId"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="button-wrapper">
      <el-button @click="resetForm($refs.userForm)">Reset</el-button>
      <el-button
        type="primary"
        @click="onSubmit($refs.userForm)"
        :loading="loading"
      >
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';

export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    resetForm: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      userForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        role: '',
        password: '',
        create: 'user',
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please enter first name',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Please enter last name',
          },
        ],
        emailAddress: [
          {
            required: true,
            message: 'Please enter email address',
          },
          {
            type: 'email',
            message: 'Please enter correct email address',
          },
        ],
        role: [
          {
            required: true,
            message: 'Please assign a role for new user',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('access', ['roleList']),
  },
  methods: {
    ...mapActions('access', [GET_ROLE_LIST]),
  },
  mounted() {
    this.GET_ROLE_LIST();
  },
};
</script>
