<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchCustomer">Search Customer</label>
          <el-input v-model="searchKeyword" @input="searchOnChange" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="sort" for="sortCustomers">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortCustomers">
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
  <!-- <el-container>
    <el-button class="custom-btn add-btn" @click="$router.push(`/create/customer`)">Add New Customer</el-button>
  </el-container> -->
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
      <!-- <div :style="{ padding: '5px' }" @click="$router.push(`/userprofile/${o.customerId}`)"> -->
      <router-link :to="`/customers/${each.customerId}/details`">
        <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
            <div class="portrait">
              <img :src="each.customerDisplayPhotoFilePath" />
            </div>
            <div style="padding: 14px;">
              <span style="font-size:22px">{{each.customerName}}</span>
              <!-- <div class="bottom" style="padding-top:10px; font-size:18px">
              <span>By {{each.customerName}}</span>
              </div>-->
            </div>
          </el-card>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import { GET_CUSTOMER_LIST, SEARCH_CUSTOMER_IN_LIST, SORT_CUSTOMERS } from '@/store/modules/customer/actions-type';
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
  name: 'CustomerListing',
  computed: {
    ...mapState('customer', ['customerList', 'gettingCustomerList']),
    ...mapGetters('customer', ['getCustomers']),
  },
  mounted() {
    this.GET_CUSTOMER_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    // this.RESET_USER_STATE();
  },
  watch: {
    customerList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const customerList = this.getCustomers({
        ...this.pagination,
      });
      this.data = customerList.data;
      this.pagination = customerList.pagination;
    },
  },
  methods: {
    ...mapActions('customer', [GET_CUSTOMER_LIST, SEARCH_CUSTOMER_IN_LIST, SORT_CUSTOMERS]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const customerList = this.getCustomers({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = customerList.data;
      }, 1);
      this.pagination = customerList.pagination;
    },
    onSubmit(values) {
      if (values.model.actionType === 'role') {
        this.editRoleDialog = false;
      } else if (values.model.actionType === 'password') {
        this.editPasswordDialog = false;
      }
      this.userId = null;
    },
    searchOnChange() {
      this.SEARCH_CUSTOMER_IN_LIST(this.searchKeyword);
    },
    sortCustomers() {
      this.SORT_CUSTOMERS(this.value);
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
