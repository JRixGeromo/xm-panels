<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchLicensor">Search Licensor</label>
          <el-input v-model="searchKeyword" @input="searchOnChange" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="sort" for="sortLicensors">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortLicensors">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-container>
  <el-container>
    <el-button class="custom-btn add-btn" @click="$router.push(`/create/licensor`)">Add New Licensor</el-button>
  </el-container>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
    :current-page="pagination.currentPage + 1"
  ></el-pagination>
  <!-- <el-table :data="data" v-loading="gettingUserList" stripe :header-cell-style="{ background: '#373737' }">
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
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditRoleDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="Edit Password" align="center">
      <template #default="scope">
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditPasswordDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
  </el-table>-->
  <!-- <el-table :data="data" v-loading="gettingUserList" stripe :header-cell-style="{ background: '#373737' }"> -->
  <el-row>
    <!-- <el-col :span="24" v-for="(o, index) in data" :key="o" :offset="index > 0 ? 2 : 0"> -->
    <el-col :xs="24" :md="6" v-for="(each) in data" :key="each">
      <!-- <el-col :span="8" :data="data" v-loading="gettingUserList"> -->
      <!-- <div :style="{ padding: '5px' }" @click="$router.push(`/userprofile/${o.licenseId}`)"> -->
      <router-link :to="`/licensor/${each.licenseId}/details?name=${each.licenseName}`">
        <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
            <div class="portrait">
              <img :src="each.licenseDisplayImage" />
            </div>
            <div style="padding: 14px;">
              <span style="font-size:22px">{{each.licenseName}}</span>
              <!-- <div class="bottom" style="padding-top:10px; font-size:18px">
              <span>By {{each.licenseName}}</span>
              </div>-->
            </div>
          </el-card>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import { GET_LICENSOR_LIST, UPDATE_LICENSOR, SEARCH_LICENSOR_IN_LIST, SORT_LICENSORS } from '@/store/modules/licensor/actions-type';
// import { EDIT_USER_ROLE } from '@/store/modules/access/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';
// import EditPasswordForm from '@/components/User/EditPasswordForm.vue';
// import EditRoleForm from '@/components/User/EditRoleForm.vue';
// import UserRole from '@/components/Access/UserRole.vue';
// import { getAuthID } from '@/helpers';

const defaultPagination = {
  itemPerPage: 8,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'LicensorListing',
  computed: {
    ...mapState('licensor', ['licensorList', 'gettingLicensorList', 'updatingLicensor']),
    // ...mapState('access', ['updatingUserRole']),
    ...mapGetters('licensor', ['getLicensors']),
  },
  mounted() {
    this.GET_LICENSOR_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    // this.RESET_USER_STATE();
  },
  watch: {
    licensorList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const licensorList = this.getLicensors({
        ...this.pagination,
      });
      this.data = licensorList.data;
      this.pagination = licensorList.pagination;
    },
  },
  methods: {
    ...mapActions('licensor', [GET_LICENSOR_LIST, UPDATE_LICENSOR, SEARCH_LICENSOR_IN_LIST, SORT_LICENSORS]),
    // ...mapActions('access', [EDIT_USER_ROLE]),
    // ...mapMutations('user', [RESET_USER_STATE]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const licensorList = this.getLicensors({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = licensorList.data;
      }, 1);
      this.pagination = licensorList.pagination;
    },
    // handleEditPasswordDialog(licensor) {
    //   this.editPasswordDialog = !this.editPasswordDialog;
    //   const userInfo = {
    //     userId: user.userId,
    //     userName: user.userName,
    //   };
    //   this.userInfo = userInfo;
    // },
    // handleEditRoleDialog(user) {
    //   this.editRoleDialog = !this.editRoleDialog;
    //   const userInfo = {
    //     userId: user.userId,
    //     userName: user.userName,
    //   };
    //   this.userInfo = userInfo;
    // },
    onSubmit(values) {
      if (values.model.actionType === 'role') {
        // const roleBody = {
        //   roleIds: [
        //     values.model.role,
        //   ],
        // };
        // this.EDIT_LICENSOR_ROLE({
        //   roleDetail: roleBody,
        //   authorizationId: values.model.authorizationId,
        // });
        this.editRoleDialog = false;
      } else if (values.model.actionType === 'password') {
        // const updatePassword = {
        //   userId: this.userInfo.userId,
        //   newSecret: values.model.password,
        //   currentSecret: values.model.current_password,
        //   applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
        // };
        // this.UPDATE_PASSWORD(updatePassword);
        this.editPasswordDialog = false;
      }
      this.userId = null;
    },
    searchOnChange() {
      this.SEARCH_LICENSOR_IN_LIST(this.searchKeyword);
    },
    sortLicensors() {
      this.SORT_LICENSORS(this.value);
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
      // licensorInfo: {
      //   licenseName: '',
      //   licenseDescription: '',
      // },
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
    // EditPasswordForm,
    // UserRole,
    // EditRoleForm,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.profile-pic-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pad-top {
  margin-top: 10px;
}
.el-card {
  background-color: $--color-primary;
  color: #fff;
  border-radius: 0px;
  text-align: center;
  border: unset;
  cursor: pointer;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.portrait {
  height: 400px;
  width: 100%;
}
a {
  text-decoration: unset;
}
</style>
