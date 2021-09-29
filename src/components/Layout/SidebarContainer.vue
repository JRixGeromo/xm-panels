<template>
  <Sidebar :sidebarShow="!sidebarShow" :handleSidebarShow="handleSidebarShow" v-if="!isMobileView"/>
  <SidebarMobile
    :sidebarShow="sidebarShow"
    :handleSidebarShow="handleSidebarShow"
    v-else
  />
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar.vue';
import SidebarMobile from '@/components/Layout/SidebarMobile.vue';

export default {
  props: {
    isMobileView: Boolean,
    sidebarShow: Boolean,
    handleSidebarShow: Function,
  },
  components: {
    Sidebar,
    SidebarMobile,
  },
};
</script>
