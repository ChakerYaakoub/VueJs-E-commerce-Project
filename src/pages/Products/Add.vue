<template>
    <BodyAuth>
      <Retour :href="'/produits'" />
      <HeaderForm :content="'Ajout produit'" />
      <ContentForm @submit.prevent="handleSubmit">
        <DivInput>
          <Input
            id="designation"
            type="text"
            label="Designation"
            inputName="designation"
            v-model="designation"
            @input="onChangeDesignation"
            :double="true"
          />
          <Input
            id="prix"
            type="number"
            label="Prix"
            inputName="prix"
            v-model="prix"
            @input="onChangePrix"
            :double="true"
          />
        </DivInput>
        <DivInput>
          <Input
            id="quantite"
            type="number"
            label="Quantité"
            inputName="quantite"
            v-model="quantite"
            @input="onChangeQuantite"
            :double="true"
          />
          <Input
            id="date_in"
            type="date"
            label="Date d'arrivée"
            inputName="date_in"
            v-model="dateIn"
            @input="onChangeDateIn"
            :double="true"
          />
        </DivInput>
        <DivInput>
          <select id="categorie" v-model="categorie" @change="onChangeCategorie" ref="categorieList">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.designation }}</option>
          </select>
        </DivInput>
        <DivInput>
          <Button bgColor="#FFC107" textColor="#383F51" content="Enregistrer" :icon="false" />
        </DivInput>
      </ContentForm>
    </BodyAuth>
  </template>
  
  <script>
  import { BodyAuth, HeaderForm, ContentForm, DivInput, Input, Button, Retour } from '../../components';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useStore } from 'vuex'; // Import useStore from vuex
  
  export default {
    components: {
      BodyAuth,
      HeaderForm,
      ContentForm,
      DivInput,
      Input,
      Button,
      Retour,
    },
    setup() {
      const router = useRouter();
      const store = useStore(); // Use useStore to access the Vuex store
  
      const designation = ref('');
      const prix = ref('');
      const quantite = ref('');
      const dateIn = ref('');
      const categorie = ref('');
      const categories = ref([]);
      const categorieList = ref(null);
  
      const onChangeDesignation = (event) => {
        designation.value = event.target.value;
      };
  
      const handleSubmit = async () => {
        if (!designation.value || !prix.value || !dateIn.value || !quantite.value || !categorie.value) {
          alert('Veuillez bien remplir les champs');
          return;
        }
  
        const form = {
          designation: designation.value,
          prix: parseFloat(prix.value),
          dateIn: dateIn.value,
          quantite: parseInt(quantite.value),
          categorieId: parseInt(categorie.value),
        };
  
        try {
          const response = await axios.post(`http://localhost:3000/produits`, form);
          if (response.status === 200) {
            router.push('/produits');
          } else {
            alert('Erreur');
          }
        } catch (error) {
          alert('Veuillez bien remplir les champs');
        }
      };
  
      const getCategorie = async () => {
        try {
          store.dispatch('htmlElements/setLoading', true); // Dispatch the setLoading action
          const response = await axios.get(`http://localhost:3000/categories/All`);
          categories.value = response.data;
          categorie.value = response.data[0].id;
          store.dispatch('htmlElements/setLoading', false); // Dispatch the setLoading action
        } catch (error) {
          console.log(error);
        }
      };
  
      onMounted(getCategorie);
  
      return {
        designation,
        prix,
        quantite,
        dateIn,
        categorie,
        categories,
        categorieList,
        onChangeDesignation,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  