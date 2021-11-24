<template>
  <el-row type="flex" justify="left">
    <el-col :span="24" :sm="{ span: 20 }" :md="{ span: 16 }">
      <h1 style="color: #fff; margin-bottom: 15px">{{ userInfo.userName }}</h1>
    </el-col>
  </el-row>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="userForm"
    :rules="rules"
    ref="userForm"
    @keyup.enter="onSubmit($refs.userForm)"
  >
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
    <el-form-item label="Current Password" prop="password">
      <el-input type="password" v-model="userForm.current_password"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="userForm.password"></el-input>
    </el-form-item>

    <el-form-item label="Confirm Password" prop="confirm_password">
      <el-input type="password" v-model="userForm.confirm_password"></el-input>
    </el-form-item>

    <el-form-item class="button-wrapper">
      <el-button
        type="primary"
        @click="onSubmit($refs.userForm, authorizationId)"
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
import accessService from '@/services/access-service';

export default {
  props: {
    userInfo: {
      type: Object,
      default: null,
    },
    onSubmit: {
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
        current_password: '',
        password: '',
        userId: '',
        role: '',
      },
      rules: {
        current_password: [
          {
            required: true,
            message: 'Please enter current password',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter password',
          },
        ],
        confirm_password: [
          {
            required: true,
            message: 'Please confirm password',
          },
        ],
      },
      authorizationId: null,
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
    accessService.getUserAuthorization(this.userInfo.userId).then(
      (data) => {
        this.userForm.role = data.roles[0].roleId;
        this.authorizationId = data.authorizationId;
      },
    );
  },
};
</script>
