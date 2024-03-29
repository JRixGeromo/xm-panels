<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchArtist">Search Artist</label>
          <el-input v-model="searchKeyword" @input="searchOnChange" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="sort" for="searchArtists">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortArtists">
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
    <el-button class="custom-btn add-btn" @click="$router.push(`/create/artist`)">Add New Artist</el-button>
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
      <!-- <div :style="{ padding: '5px' }" @click="$router.push(`/userprofile/${o.userId}`)"> -->
      <!-- ${scope.row.artistId} -->
      <router-link :to="`/artists/${each.artistId}/details`">
        <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <div class="portrait">
              <img :src="each.artistDisplayPhotoFilePath" class="image" />
            </div>
            <!-- <DataContainer v-if="each.artistDisplayPhotoFilePath"
            :dataDetail="each"
            />-->
            <div style="padding: 14px;">
              <span style="font-size:22px">{{each.artistName}}</span>
              <div class="bottom" style="padding-top:10px; font-size:18px">
                <span>By {{each.artistEmailAddress}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import { GET_ARTIST_LIST,
  UPDATE_ARTIST_PROFILE,
  SEARCH_ARTIST_IN_LIST,
  SORT_ARTISTS } from '@/store/modules/artist/actions-type';
import { EDIT_USER_ROLE } from '@/store/modules/access/actions-type';
import { RESET_ARTIST_STATE } from '@/store/modules/artist/mutations-type';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
// import DataContainer from '@/components/Share/DataContainer.vue';
// import UserRole from '@/components/Access/UserRole.vue';
import { getAuthID } from '@/helpers';

const defaultPagination = {
  itemPerPage: 8,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'ArtistListing',
  computed: {
    ...mapState('artist', ['artistList', 'gettingArtistList']),
    ...mapState('access', ['updatingUserRole']),
    ...mapGetters('artist', ['getArtistList']),
  },
  mounted() {
    this.GET_ARTIST_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    this.RESET_ARTIST_STATE();
  },
  watch: {
    artistList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const artistList = this.getArtistList({
        ...this.pagination,
      });
      this.data = artistList.data;
      this.pagination = artistList.pagination;
    },
  },
  methods: {
    ...mapActions('artist', [GET_ARTIST_LIST, UPDATE_ARTIST_PROFILE, SEARCH_ARTIST_IN_LIST, SORT_ARTISTS]),
    ...mapActions('access', [EDIT_USER_ROLE]),
    ...mapMutations('artist', [RESET_ARTIST_STATE]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const artistList = this.getArtistList({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = artistList.data;
      }, 1);
      this.pagination = artistList.pagination;
    },
    refreshArtworkList() {
      this.GET_ARTIST_LIST();
      this.data = [];
    },
    handleIsFeatureClick(artist) {
      const newArtistProfile = {
        ...artist,
        isFeatured: !artist.isFeatured,
        artUpdatedBy: getAuthID().userId,
      };
      // this.EDIT_FEATURE_ARTWORK({
      //   artDetails: newArtwork,
      //   getArtwork: this.refreshArtworkList,
      // });
      this.UPDATE_ARTIST_PROFILE({
        profileDetails: newArtistProfile,
        callbackFunc: this.refreshArtworkList,
      });
    },
    searchOnChange() {
      this.SEARCH_ARTIST_IN_LIST(this.searchKeyword);
    },
    sortArtists() {
      this.SORT_ARTISTS(this.value);
    },
  },
  data() {
    return {
      page: 0,
      data: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
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
    // DataContainer,
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
.image {
  width: 100%;
  height: 100%;
  border-radius: 0px;
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
