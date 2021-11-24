import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import dashboard from './modules/dashboard';
import user from './modules/user';
import artist from './modules/artist';
import product from './modules/product';
import nfts from './modules/nfts';
import customer from './modules/customer';
import autograph from './modules/autograph';
import licensor from './modules/licensor';
import character from './modules/character';
import relation from './modules/relationship';
import access from './modules/access';
import configuration from './modules/configuration';
import linkstoggle from './modules/linkstoggle';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    auth,
    dashboard,
    user,
    product,
    nfts,
    customer,
    autograph,
    artist,
    licensor,
    character,
    relation,
    access,
    configuration,
    linkstoggle,
  },
  strict: true,
  plugins: debug ? [createLogger()] : [],
});
