<template>
  <div style="margin-bottom: 30px">
    <label class="form-label">ROLES</label>
  </div>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
  >
  </el-pagination>
  <el-table :data="data" stripe :header-cell-style="{ background: '#000', 'font-family': 'gotham' }">
    <el-table-column type="expand">
      <template #default="props">
        <div v-if="props.row.permissions.length > 0">
          <el-row :gutter="20">
            <el-col
              :xs="24"
              :sm="12"
              :md="6"
              v-for="permission in props.row.permissions"
              :key="permission.permissionId"
            >
              <div>
                <div class="permission-header">
                  {{ `${permission.permissionName} - ${permission.type}` }}
                </div>
                <ul>
                  <li v-for="access in permission.accessVerbs" :key="access" style="margin-left: 20px">
                    {{ access }}
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-else>No permissions</div>
      </template>
    </el-table-column>
    <el-table-column prop="roleName" label="Role">
      <template v-slot:default="slotProps">
        {{ slotProps.row.roleName ?? '-' }}
      </template>
    </el-table-column>
    <el-table-column width="200px" align="right">
      <template #default="scope">
        <el-button size="mini" icon="xm-el-icon-pen" class="edit-icon-custom" @click="handleEditDialog(scope.row)"
          ></el-button
        >
        <el-popconfirm
          confirmButtonText="OK"
          cancelButtonText="No, Thanks"
          icon="el-icon-info"
          iconColor="red"
          title="Are you sure to delete this?"
          @confirm="handleDelete(scope.row.roleId)"
        >
          <template #reference>
            <el-button
              size="mini" icon="xm-el-icon-delete" class="edit-icon-custom"
              :loading="deletingRole && scope.row.roleId === deletingRoleId"
              ></el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
  >
  </el-pagination>

  <el-dialog
    custom-class="custom-dialog"
    title="Edit Role"
    v-model="editDialog"
    :destroy-on-close="true"
    width="75%"
  >
    <RoleForm
      :onSubmit="onSubmit"
      :resetForm="resetForm"
      :loading="updatingRole"
      :permissions="permissionList"
      :defaultValue="selectedRole"
      :isEditMode="true"
    />
  </el-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { GET_ROLE_LIST,
  GET_PERMISSION_LIST,
  EDIT_ROLE,
  DELETE_ROLE } from '@/store/modules/access/actions-type';
import RoleForm from '@/components/Access/RoleForm.vue';

const defaultPagination = {
  itemPerPage: 10,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'RoleListing',
  computed: {
    ...mapState('access', [
      'roleList',
      'permissionList',
      'updatingRole',
      'deletingRole',
      'deletingRoleId',
    ]),
    ...mapGetters('access', ['getRoleList']),
  },
  mounted() {
    this.GET_ROLE_LIST();
    this.GET_PERMISSION_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
  },
  watch: {
    roleList() {
      const roleList = this.getRoleList({
        ...this.pagination,
      });
      this.data = roleList.data;
      this.pagination = roleList.pagination;
    },
  },
  methods: {
    ...mapActions('access', [
      GET_ROLE_LIST,
      GET_PERMISSION_LIST,
      EDIT_ROLE,
      DELETE_ROLE,
    ]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const roleList = this.getRoleList({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = roleList.data;
      }, 1);
      this.pagination = roleList.pagination;
    },
    handleEditDialog(roleDetail) {
      this.editDialog = !this.editDialog;
      const role = {
        roleId: roleDetail.roleId,
        roleName: roleDetail.roleName,
        permissionsIds: roleDetail.permissions.map((x) => x.permissionId),
      };
      this.selectedRole = role;
    },
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          const roleDetails = {
            ...form.model,
          };
          this.EDIT_ROLE({
            roleDetail: roleDetails,
            successEditCallback: this.successEditCallback,
          });
        }
      });
    },
    resetForm(form) {
      form.resetFields();
      this.editDialog = false;
    },
    successEditCallback() {
      this.editDialog = false;
      this.selectedRole = null;
      this.GET_ROLE_LIST();
    },
    handleDelete(roleId) {
      this.DELETE_ROLE({
        id: roleId,
        successCallback: this.GET_ROLE_LIST,
      });
    },
  },
  data() {
    return {
      page: 0,
      data: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      editDialog: false,
      selectedRole: null,
    };
  },
  components: {
    RoleForm,
  },
};
</script>

<style lang="scss" scoped>
.permission-header {
  font-weight: bold;
}
</style>
