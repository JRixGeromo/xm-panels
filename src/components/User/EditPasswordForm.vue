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
    <!-- <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="userForm.password"></el-input>
    </el-form-item>

    <el-form-item label="Confirm Password" prop="confirm_password">
      <el-input type="password" v-model="userForm.confirm_password"></el-input>
    </el-form-item> -->

    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
         <!-- <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item> -->
        <TextInput
            v-model="userForm.password"
            formProps="password"
            formLabel="Password"
            inputType="password"
          />
      </el-col>
      <el-col :span="12" :xs="24">
        <!-- <el-form-item label="Password" prop="confirm_password">
          <el-input type="password" v-model="userForm.confirm_password"></el-input>
        </el-form-item> -->
        <TextInput
            v-model="userForm.confirm_password"
            formProps="confirm_password"
            formLabel="Confirm Password"
            inputType="password"
          />
      </el-col>
    </el-row>

    <el-form-item class="button-wrapper">
      <el-button
        class="custom-btn submit-btn"
        type="success"
        @click="onSubmit($refs.userForm)"
        :loading="loading"
        :disabled="dontAllow"
      >
        UPDATE
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { mapActions, mapState } from 'vuex';
// import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
// import accessService from '@/services/access-service';
import TextInput from '@/components/Share/TextInput.vue';

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
  components: {
    TextInput,
  },
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (value === '') {
        this.dontAllow = true;
        callback(new Error('Please input the confirm password'));
      } else if (value !== this.userForm.password) {
        this.dontAllow = true;
        callback(new Error("Two inputs don't match!"));
      } else {
        this.dontAllow = false;
        callback();
      }
    };
    return {
      dontAllow: true,
      userForm: {
        current_password: '',
        password: '',
        userId: '',
        role: '',
        actionType: 'password',
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
            validator: validateConfirm,
          },
        ],
      },
      authorizationId: null,
    };
  },
  // computed: {
  //   ...mapState('access', ['roleList']),
  // },
  // mounted() {
  //   this.GET_ROLE_LIST();
  //   accessService.getUserAuthorization(this.userInfo.userId).then(
  //     (data) => {
  //       this.userForm.role = data.roles[0].roleId;
  //       this.authorizationId = data.authorizationId;
  //     },
  //   );
  // },
};
</script>
