<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><!-- Home --></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <!-- <el-col :xs="24" :sm="12">
        <HomeDataRow
          title="Users"
          :loading="getttingUserDashboard"
          :data="userDashboard"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <HomeDataRow
          title="Artworks"
          :loading="getttingArtworkDashboard"
          :data="artworkDashboard"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <HomeBarChartTab
          weekTitle="New users in this week"
          monthTitle="New users per week"
          yearTitle="New users per month"
          :loading="getttingUserChart"
          :data="userChart"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <HomeBarChartTab
          weekTitle="New artworks in this week"
          monthTitle="New artworks per week"
          yearTitle="New artworks per month"
          :loading="getttingArtworkChart"
          :data="artworkChart"
        />
      </el-col>
      <el-col :span="24">
        <HomeTransactionAmountChart
          :loading="getttingTransactionChart"
          :data="transactionChart"
        />
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { computed /* onMounted */ } from 'vue';
import { useStore } from 'vuex';
// import {
//   GET_USER_DASHBOARD,
//   GET_USER_CHART,
//   GET_ARTWORK_DASHBOARD,
//   GET_ARTWORK_CHART,
//   GET_TRANSACTION_AMOUNT_CHART,
// } from '@/store/modules/dashboard/actions-type';
// import HomeDataRow from '@/components/Home/HomeDataRow.vue';
// import HomeBarChartTab from '@/components/Home/HomeBarChartTab.vue';
// import HomeTransactionAmountChart from '@/components/Home/HomeTransactionAmountChart.vue';

export default {
  name: 'Home',
  components: {
    // HomeDataRow,
    // HomeBarChartTab,
    // HomeTransactionAmountChart,
  },
  setup() {
    const store = useStore();
    // onMounted(() => {
    //   store.dispatch(`dashboard/${GET_USER_DASHBOARD}`);
    //   store.dispatch(`dashboard/${GET_ARTWORK_DASHBOARD}`);
    //   store.dispatch(`dashboard/${GET_USER_CHART}`);
    //   store.dispatch(`dashboard/${GET_ARTWORK_CHART}`);
    //   store.dispatch(`dashboard/${GET_TRANSACTION_AMOUNT_CHART}`);
    // });

    return {
      getttingUserDashboard: computed(
        () => store.state.dashboard.getttingUserDashboard,
      ),
      userDashboard: computed(() => store.state.dashboard.userDashboard),
      getttingArtworkDashboard: computed(
        () => store.state.dashboard.getttingArtworkDashboard,
      ),
      artworkDashboard: computed(() => store.state.dashboard.artworkDashboard),
      getttingUserChart: computed(
        () => store.state.dashboard.getttingUserChart,
      ),
      userChart: computed(() => store.state.dashboard.userChart),
      getttingArtworkChart: computed(
        () => store.state.dashboard.getttingArtworkChart,
      ),
      artworkChart: computed(() => store.state.dashboard.artworkChart),
      getttingTransactionChart: computed(
        () => store.state.dashboard.getttingTransactionChart,
      ),
      transactionChart: computed(() => store.state.dashboard.transactionChart),
    };
  },
};
</script>
