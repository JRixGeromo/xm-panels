<template>
  <el-row type="flex" justify="left">
    <el-col :span="24" :sm="{ span: 20 }" :md="{ span: 16 }">
      <h1>{{ userInfo.userName }}</h1>
    </el-col>
  </el-row>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="userForm"
    ref="userForm"
    @keyup.enter="onSubmit($refs.userForm)"
  >
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
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
    <!-- <el-form-item label="Role" prop="role">
      <el-select v-model="userForm.role" placeholder="Select">
        <el-option
          v-for="role in roleList"
          :key="role.roleId"
          :label="role.roleName"
          :value="role.roleId"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item class="button-wrapper">
      <el-button
        class="custom-btn submit-btn"
        type="success"
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
import SelectInput from '@/components/Share/SelectInput.vue';

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
    SelectInput,
  },
  data() {
    return {
      userForm: {
        userId: '',
        role: '',
        actionType: 'role',
        authorizationId: null,
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
    if (this.userInfo.userId) {
      accessService.getUserAuthorization(this.userInfo.userId).then(
        (data) => {
          this.userForm.role = data.roles[0].roleId;
          this.userForm.authorizationId = data.authorizationId;
        },
      );
    }
  },
};
</script>
