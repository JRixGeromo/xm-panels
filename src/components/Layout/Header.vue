<template>
  <el-header class="header">
    <div class="header-name-wrapper">
      <div @click="handleSidebarShow('click')" class="icon-wrapper">
        <span class="fa fa-bars"></span>
      </div>
      <!-- <h2 @click="toHome">XM</h2> -->
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-menu header-action-icon"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="SIGN_OUT">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapActions } from 'vuex';
import { SIGN_OUT } from '@/store/modules/auth/actions-type';

export default {
  props: {
    handleSidebarShow: Function,
    isMobileView: Boolean,
  },
  methods: {
    ...mapActions('auth', [SIGN_OUT]),
    toHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  height: 60px;
  max-height: 60px;
  justify-content: space-between;
}

.header-name-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    user-select: none;
    cursor: pointer;
  }
}

.icon-wrapper {
  margin-right: 20px;
}

.icon-wrapper,
.header-action-icon {
  font-size: 25px;
  cursor: pointer;
}
</style>
