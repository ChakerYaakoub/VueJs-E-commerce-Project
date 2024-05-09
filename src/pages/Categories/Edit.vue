<template>
    <BodyAuth>
      <Retour :href="'/categories'" />
      <HeaderForm :content="'Modifier produit'" />
      <ContentForm @submit="handleSubmit">
        <DivInput>
          <Input
            id="designation"
            type="text"
            label="Designation"
            inputName="designation"
            v-model="designation"
            :double="false"
            :required="true"
          />
        </DivInput>
        <DivInput>
          <Button
            bgColor="#FFC107"
            textColor="#383F51"
            content="Modifier"
            @click.prevent="handleSubmit"
            :icon="false"
          />
        </DivInput>
      </ContentForm>
    </BodyAuth>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useNavigate, useParams } from 'vue-router-dom';
  import axios from 'axios';
  import { useStore } from 'vuex'; // Import useStore instead of useDispatch
  import { setLoading } from '../../redux/features/htmlElements';
  
  export default {
    setup() {
      const { id } = useParams();
      const navigateTo = useNavigate();
      const store = useStore(); // Use useStore to access the Vuex store
      const state = reactive({
        designation: '',
      });
  
      const onChangeDesignation = (event) => {
        state.designation = event.target.value;
      };
  
      const handleSubmit = async () => {
        if (!state.designation) {
          alert('Veuillez bien remplir les champs');
          return;
        }
  
        const form = {
          designation: state.designation,
        };
  
        try {
          store.commit('setLoading', true); // Use store.commit to call mutation
          let response = await axios.put(`http://localhost:3000/categories/${id}`, form);
          if (response.status === 200) {
            navigateTo('/categories');
          } else {
            alert('Erreur');
          }
        } catch (error) {
          console.error(error.message);
        } finally {
          store.commit('setLoading', false); // Use store.commit to call mutation
        }
      };
  
      const defineProduit = async () => {
        try {
          store.commit('setLoading', true); // Use store.commit to call mutation
          let response = await axios.get(`http://localhost:3000/categories/${id}`);
          let data = await response.data;
          state.designation = data.designation;
        } catch (error) {
          console.error(error.message);
        } finally {
          store.commit('setLoading', false); // Use store.commit to call mutation
        }
      };
  
      defineProduit();
  
      return {
        state,
        onChangeDesignation,
        handleSubmit,
      };
    },
  };
  </script>
  
  