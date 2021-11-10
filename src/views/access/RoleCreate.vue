<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/rolelisting' }">All Roles</el-breadcrumb-item>
    <el-breadcrumb-item>Create Role</el-breadcrumb-item>
  </el-breadcrumb>

  <el-row type="flex" justify="center">
    <el-col :span="24" :sm="{span: 20}" :md="{span: 16}" style="margin-bottom: 30px">
      <label class="form-label">CREATE ROLE</label>
    </el-col>
    <el-col :span="24" :sm="{span: 20}" :md="{span: 16}">
      <RoleForm
        :onSubmit="onSubmit"
        :resetForm="resetForm"
        :loading="creatingRole"
        :permissions="permissions"
      />
    </el-col>
  </el-row>
</template>

<script>
import { useStore, mapActions } from 'vuex';
import { computed, onMounted } from 'vue';
import { GET_PERMISSION_LIST, CREATE_ROLE } from '@/store/modules/access/actions-type';
import RoleForm from '@/components/Access/RoleForm.vue';

export default {
  name: 'RoleCreate',
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch(`access/${GET_PERMISSION_LIST}`);
    });
    return {
      permissions: computed(() => store.state.access.permissionList),
      gettingPermissionList: computed(() => store.state.access.gettingPermissionList),
      creatingRole: computed(() => store.state.access.creatingRole),
    };
  },
  methods: {
    ...mapActions('access', [CREATE_ROLE]),
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          const roleDetail = {
            ...form.model,
          };
          this.CREATE_ROLE(roleDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    RoleForm,
  },
};
</script>
