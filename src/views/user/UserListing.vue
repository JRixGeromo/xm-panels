<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchUsers">Search users</label>
          <el-input
            v-model="searchKeyword"
            @input="searchOnChange"
            suffix-icon="el-icon-search"
            >
          </el-input>
        </el-col>
        <!-- <el-col :span="6">
          <label class="sort" for="searchNfts">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortUsers">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
      </el-row>
    </div>
  </el-container>
  <el-container>
    <router-link :to="`/createuser`">
        <el-button class="custom-btn add-btn">Create User</el-button>
      </router-link>
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
  <el-table :data="data" stripe :header-cell-style="{ background: '#000', 'font-family': 'gotham' }">
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
        <el-button size="mini" icon="xm-el-icon-pen" class="edit-icon-custom" @click="handleEditRoleDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="Edit Password" align="center">
      <template #default="scope">
        <el-button size="mini" icon="xm-el-icon-pen" class="edit-icon-custom" @click="handleEditPasswordDialog(scope.row)"
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
import { GET_USER_LIST, UPDATE_PASSWORD, SEARCH_USER_IN_LIST, SORT_USERS } from '@/store/modules/user/actions-type';
import { EDIT_USER_ROLE } from '@/store/modules/access/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';
import EditPasswordForm from '@/components/User/EditPasswordForm.vue';
import EditRoleForm from '@/components/User/EditRoleForm.vue';
import UserRole from '@/components/Access/UserRole.vue';
// import router from '@/router';
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
    ...mapState('access', ['updatingUserRole', 'userUpdated']),
    ...mapGetters('user', ['getUsers']),
  },
  mounted() {
    this.GET_USER_LIST();
    this.toPage = this.$route.query.n > 0 ? (this.$route.query.n - 1) : 0;
    window.history.replaceState(
      {
      },
      document.title, '/userlisting',
    );
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
          currentPage: this.toPage,
        };
      }
      this.pagination.currentPage = parseInt(this.toPage, 10);
      const userList = this.getUsers({
        ...this.pagination,
      });
      this.data = userList.data;
      this.pagination = userList.pagination;
    },
    userUpdated() {
      window.location.href = `/userlisting?n=${this.toPage}`;
    },
  },
  methods: {
    ...mapActions('user', [GET_USER_LIST, UPDATE_PASSWORD, SEARCH_USER_IN_LIST, SORT_USERS]),
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
      this.toPage = this.pagination.currentPage + 1;
      if (values.model.actionType === 'role') {
        const roleBody = {
          roleIds: [
            values.model.role,
          ],
        };
        this.EDIT_USER_ROLE({
          userId: this.userInfo.userId,
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
    sortUsers() {
      this.SORT_USERS(this.value);
    },
  },
  data() {
    return {
      toPage: 0,
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
          value: 'newest',
          label: 'Newest',
        },
        {
          value: 'oldest',
          label: 'Oldest',
        },
      ],
      value: 'newest',
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
