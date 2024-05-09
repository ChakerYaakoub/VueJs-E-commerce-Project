<template>
    <BodyAuth>
      <Retour :href="'/produits'" />
      <HeaderForm :content="'Modifier produit'" />
  
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
            required
          />
          <Input
            id="prix"
            type="number"
            label="Prix"
            inputName="prix"
            v-model="prix"
            @input="onChangePrix"
            :double="true"
            required
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
            required
          />
          <Input
            id="date_in"
            type="date"
            label="Date d'arrivée"
            inputName="date_in"
            v-model="dateIn"
            @input="onChangeDateIn"
            :double="true"
            required
          />
        </DivInput>
  
        <DivInput>
          <select id="categorie" v-model="categorie" @change="onChangeCategorie" ref="categorieList">
            <option v-for="category in allCategorie" :key="category.id" :value="category.id">{{ category.designation }}</option>
          </select>
        </DivInput>
  
        <DivInput>
          <Button
            bgColor="#FFC107"
            textColor="#383F51"
            content="Modifier"
            :icon="false"
          />
        </DivInput>
      </ContentForm>
    </BodyAuth>
  </template>
  
  <script>
  import { BodyAuth, HeaderForm, ContentForm, DivInput, Input, Button, Retour } from '../../components';
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  // import store from '../../redux/store'; // Assuming your Vuex store is located in /store.js
  
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
      const route = useRoute();
      const { id } = route.params;
  
      const designation = ref('');
      const prix = ref('');
      const quantite = ref('');
      const dateIn = ref('');
      const categorie = ref('');
      const allCategorie = ref([]);
  
      const categorieList = ref(null);
  
      const onChangeDesignation = (event) => {
        designation.value = event.target.value;
      };
  
      const onChangePrix = (event) => {
        prix.value = event.target.value;
      };
  
      const onChangeQuantite = (event) => {
        quantite.value = event.target.value;
      };
  
      const onChangeDateIn = (event) => {
        dateIn.value = event.target.value;
      };
  
      const onChangeCategorie = (event) => {
        categorie.value = event.target.value;
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
          const response = await axios.put(`http://localhost:3000/produits/${id}`, form);
          if (response.status === 200) {
            router.push('/produits');
          } else {
            alert('Erreur');
          }
        } catch (error) {
          console.error(error.message);
        }
      };
  
      const defineProduit = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/produits/${id}`);
          const data = response.data;
          designation.value = data.designation;
          prix.value = data.prix;
          quantite.value = data.quantite;
          dateIn.value = data.dateIn;
          categorie.value = data.categorieId;
        } catch (error) {
          console.error(error.message);
        }
      };
  
      const getCategorie = async () => {
        try {
          store.commit('setLoading', true);
          const response = await axios.get(`http://localhost:3000/categories/All`);
          allCategorie.value = response.data;
          categorie.value = response.data[0].id;
          store.commit('setLoading', false);
        } catch (error) {
          console.log(error);
        }
      };
  
      onMounted(() => {
        defineProduit();
        getCategorie();
      });
  
      return {
        designation,
        prix,
        quantite,
        dateIn,
        categorie,
        allCategorie,
        categorieList,
        onChangeDesignation,
        onChangePrix,
        onChangeQuantite,
        onChangeDateIn,
        onChangeCategorie,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  