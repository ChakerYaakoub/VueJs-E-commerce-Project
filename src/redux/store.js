// store/index.js
import { createStore } from 'vuex';
import userModule from './features/userSlice';
import htmlElementsModule from './features/htmlElements';

const store = createStore({
  modules: {
    user: userModule,
    htmlElements: htmlElementsModule,
  },
});

export default store;
