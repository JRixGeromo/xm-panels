import vueCountryRegionSelect from 'vue3-country-region-select';
import { Chart, registerables } from 'chart.js';
import VueSmoothScroll from 'vue3-smooth-scroll';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { VueCookieNext } from 'vue-cookie-next';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Chart.register(...registerables);

VueCookieNext.config({
  expire: '2h',
  path: '/',
  sameSite: 'Strict',
  // secure: true,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vueCountryRegionSelect);
app.use(ElementPlus);
app.use(VueSmoothScroll);
app.use(VueCookieNext);
app.mount('#app');
