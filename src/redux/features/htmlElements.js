// store/modules/htmlElements.js
const initialState = {
    bodyAuthWidth: 0,
    bodyAuthHeight: 0,
    loading: true,
    panierChange: 0,
    actualPageProduit: parseInt(localStorage.getItem('actualPageProduit')) || 1,
    actualPageCategorie: parseInt(localStorage.getItem('actualPageCategorie')) || 1,
  };
  export const setLoading = (state, loading) => {
    state.loading = loading;
  };
  
  
  const htmlElementsModule = {
    state: () => ({
      ...initialState
    }),
    mutations: {
      setBodyWidth(state, width) {
        state.bodyAuthWidth = width;
      },
      setBodyHeight(state, height) {
        state.bodyAuthHeight = height;
      },
      // setLoading(state, loading) {
      //   state.loading = loading;
      // },
      setPanierChange(state) {
        state.panierChange++;
      },
      setActualPageProduit(state, page) {
        state.actualPageProduit = page;
        localStorage.setItem('actualPageProduit', page);
      },
      setActualPageCategorie(state, page) {
        state.actualPageCategorie = page;
        localStorage.setItem('actualPageCategorie', page);
      },
      setLoading,
    },
    actions: {
      // Your actions here
    },
    getters: {
      // Your getters here
    }
  };
  // export { setLoading }; 
  
  export default htmlElementsModule;
  