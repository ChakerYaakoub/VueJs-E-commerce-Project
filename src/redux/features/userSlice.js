// store/modules/user.js
const initialState = {
    isLoggedIn: true,
    user: {}
  };


  
  const userModule = {
    state: () => ({
      ...initialState
    }),
    mutations: {
      loggedIn(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
  
        if (!isLoggedIn) {
          state.user = {};
        }
      },
      actualUserSet(state, user) {
        state.user = user;
      }
    },
    actions: {
      // Your actions here
    },
    getters: {
      // Your getters here
    }
  };
  
  export default userModule;
  