<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item>
      User Listing
    </el-breadcrumb-item>
  </el-breadcrumb> -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#2a2a2a"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" class="mf-size">All Users</el-menu-item>
  </el-menu>
  <el-container class="bg-portion el-container-search">
    <div class="search">
    <label class="search" for="searchUsers">Search users</label>
    <el-input
      placeholder="Type something to start searching..."
      v-model="searchKeyword"
      @input="searchOnChange"
      class="search-padding"
      >
      <template #prefix>
        <i class="el-input__icon el-icon-search search-margin"></i>
      </template>
    </el-input>
    </div>
  </el-container>
  <el-container>
    <el-button class="custom-btn add-btn">Add User</el-button>
  </el-container>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
    :current-page="pagination.currentPage + 1"
  >
  </el-pagination>
  <el-table :data="data" v-loading="gettingUserList" stripe :header-cell-style="{ background: '#373737' }">
    <el-table-column
      prop="userName"
      label="Display Name"
      align="left"
      width="auto"
      :min-width="120"
    >
      <template v-slot:default="slotProps">
        {{ slotProps.row.userName ?? '-' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="lastName"
      label="Last Name"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column
      prop="firstName"
      label="First Name"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column
      prop="emailAddress"
      label="Email"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column label="Role" align="center">
      <template v-slot:default="slotProps">
        <UserRole :userId="slotProps.row.userId" />
      </template>
    </el-table-column>
    <el-table-column label="Edit Role" align="center">
      <template #default="scope">
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditPasswordDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="Edit Password" align="center">
      <template #default="scope">
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditRoleDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
    :current-page="pagination.currentPage + 1"
  >
  </el-pagination>
  <el-dialog
    custom-class="custom-dialog"
    title="Update Passsword"
    v-model="editPasswordDialog"
    :destroy-on-close="true"
  >
    <EditPasswordForm
      :onSubmit="onSubmit"
      :loading="updatingPassword"
      :userInfo="userInfo"
      :isEditMode="true"
    />

  </el-dialog>
  <el-dialog
    custom-class="custom-dialog"
    title="Update Role"
    v-model="editRoleDialog"
    :destroy-on-close="true"
  >
    <EditRoleForm
      :onSubmit="onSubmit"
      :loading="updatingRole"
      :userInfo="userInfo"
      :isEditMode="true"
    />
  </el-dialog>
</template>

<script>
import { GET_USER_LIST, UPDATE_PASSWORD, SEARCH_USER_IN_LIST } from '@/store/modules/user/actions-type';
import { EDIT_USER_ROLE } from '@/store/modules/access/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';
import EditPasswordForm from '@/components/User/EditPasswordForm.vue';
import EditRoleForm from '@/components/User/EditRoleForm.vue';
import UserRole from '@/components/Access/UserRole.vue';
// import { getAuthID } from '@/helpers';

const defaultPagination = {
  itemPerPage: 10,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'UserListing',
  computed: {
    ...mapState('user', ['userList', 'gettingUserList', 'updatingPassword']),
    ...mapState('access', ['updatingUserRole']),
    ...mapGetters('user', ['getUsers']),
  },
  mounted() {
    this.GET_USER_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    // this.RESET_USER_STATE();
  },
  watch: {
    userList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const userList = this.getUsers({
        ...this.pagination,
      });
      this.data = userList.data;
      console.log(this.data);
      this.pagination = userList.pagination;
    },
  },
  methods: {
    ...mapActions('user', [GET_USER_LIST, UPDATE_PASSWORD, SEARCH_USER_IN_LIST]),
    ...mapActions('access', [EDIT_USER_ROLE]),
    // ...mapMutations('user', [RESET_USER_STATE]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const userList = this.getUsers({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = userList.data;
      }, 1);
      this.pagination = userList.pagination;
    },
    handleEditPasswordDialog(user) {
      this.editPasswordDialog = !this.editPasswordDialog;
      const userInfo = {
        userId: user.userId,
        userName: user.userName,
      };
      this.userInfo = userInfo;
    },
    handleEditRoleDialog(user) {
      this.editRoleDialog = !this.editRoleDialog;
      const userInfo = {
        userId: user.userId,
        userName: user.userName,
      };
      this.userInfo = userInfo;
    },
    onSubmit(values) {
      if (values.model.actionType === 'role') {
        const roleBody = {
          roleIds: [
            values.model.role,
          ],
        };
        this.EDIT_USER_ROLE({
          roleDetail: roleBody,
          authorizationId: values.model.authorizationId,
        });
        this.editRoleDialog = false;
      } else if (values.model.actionType === 'password') {
        const updatePassword = {
          userId: this.userInfo.userId,
          newSecret: values.model.password,
          currentSecret: values.model.current_password,
          applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
        };
        this.UPDATE_PASSWORD(updatePassword);
        this.editPasswordDialog = false;
      }
      this.userId = null;
    },
    searchOnChange() {
      this.SEARCH_USER_IN_LIST(this.searchKeyword);
    },
  },
  data() {
    return {
      page: 0,
      data: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
      editPasswordDialog: false,
      editRoleDialog: false,
      userInfo: {
        userId: '',
        userName: '',
      },
      options: [
        {
          value: 'Newest',
          label: 'Newest',
        },
        {
          value: 'Oldest',
          label: 'Oldest',
        },
      ],
      value: '',
    };
  },
  components: {
    EditPasswordForm,
    UserRole,
    EditRoleForm,
  },
};
</script>

<style lang="scss" scoped>
.profile-pic-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pad-top {
  margin-top: 10px;
}

</style>
