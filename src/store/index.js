import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import artist from './modules/artist';
import product from './modules/product';
import autograph from './modules/autograph';
import licensor from './modules/licensor';
import character from './modules/character';
import relation from './modules/relationship';
import access from './modules/access';
import configuration from './modules/configuration';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    auth,
    user,
    product,
    autograph,
    artist,
    licensor,
    character,
    relation,
    access,
    configuration,
  },
  strict: true,
  plugins: debug ? [createLogger()] : [],
});
