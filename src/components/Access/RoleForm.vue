<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="roleForm"
    :rules="rules"
    ref="roleForm"
    @keyup.enter="onSubmit($refs.userForm)"
  >
    <el-form-item label="Role Name" prop="roleName">
      <el-input v-model="roleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="Permission" prop="permissionsIds">
      <el-checkbox-group v-model="roleForm.permissionsIds">
          <label class="show-text top-margin" for="html">API</label>
          <el-checkbox
            v-for="permission in permissionsApi"
            :key="permission.permissions"
            :label="permission.permissionId"
            name="permission"
          >
            {{ permission.permissionName }}
          </el-checkbox>
          <label class="show-text" for="MENU">MENU</label>
          <el-checkbox
            v-for="permission in permissionsMenu"
            :key="permission.permissions"
            :label="permission.permissionId"
            name="permission"
          >
            {{ permission.permissionName }}
          </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="button-wrapper">
      <el-button @click="resetForm($refs.roleForm)">Reset</el-button>
      <el-button type="primary" @click="onSubmit($refs.roleForm)" :loading="loading">
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: Object,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    resetForm: {
      type: Function,
      required: true,
    },
    permissions: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const formValue = {
      roleName: '',
      permissionsIds: [],
    };

    return {
      roleForm: this.isEditMode ? this.defaultValue : formValue,
      api: [],
      menu: [],
      rules: {
        roleName: [
          {
            required: true,
            message: 'Please enter role name',
          },
        ],
        permissionsIds: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one permission',
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    permissionsApi() {
      return this.permissions.filter((c) => c.type.toLowerCase().indexOf('api') > -1);
    },
    permissionsMenu() {
      return this.permissions.filter((c) => c.type.toLowerCase().indexOf('menu') > -1);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-margin {
  margin-top: -10px !important;
 }
.show-text {
  font-size: 15px;
  margin-bottom: -10px;
  display: block;
}
</style>
