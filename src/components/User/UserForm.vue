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
      <el-col :span="24" class="form-text-title-pad">
        <label class="form-label">CREATE USER</label>
      </el-col>
      <el-col :span="12" :xs="24">
        <TextInput
            v-model="userForm.firstName"
            formProps="firstName"
            formLabel="First Name"
          />
      </el-col>
      <el-col :span="12" :xs="24">
        <TextInput
            v-model="userForm.lastName"
            formProps="lastName"
            formLabel="Last Name"
          />
      </el-col>
    </el-row>
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
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <TextInput
            v-model="userForm.emailAddress"
            formProps="emailAddress"
            formLabel="Email"
          />
      </el-col>
      <el-col :span="12" :xs="24">
        <SelectInput
            v-model="userForm.role"
            formProps="role"
            formLabel="Role"
          >
            <el-option
              v-for="role in roleList"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            >
            </el-option>
          </SelectInput>
      </el-col>
    </el-row>
    <el-form-item class="button-wrapper">
      <router-link :to="`/userlisting`" style="margin: 20px">
        <el-button
          class="custom-btn discard-btn"
        >
          Discard
        </el-button>
      </router-link>
      <el-button
        class="custom-btn submit-btn"
        type="success"
        @click="onSubmit($refs.userForm)"
        :loading="loading"
      >
        CREATE
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
import TextInput from '@/components/Share/TextInput.vue';
import SelectInput from '@/components/Share/SelectInput.vue';

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
  components: {
    TextInput,
    SelectInput,
  },
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the confirm password'));
      } else if (value !== this.userForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        role: '',
        password: '',
        confirm_password: '',
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
