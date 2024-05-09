<template>
  <BodyAuth>
    <Retour :href="'/categories'" />
    <HeaderForm :content="'Ajout Categorie'" />
    <ContentForm @submit="handleSubmit">
      <DivInput>
        <Input
          id="designation"
          type="text"
          label="Designation"
          inputName="designation"
          v-model="state.designation" 
          :double="false"
        />
      </DivInput>
      <DivInput>
        <Button
          bgColor="#FFC107"
          textColor="#383F51"
          content="Enregistrer"
          @click.prevent="handleSubmit"
          :icon="false"
        />
      </DivInput>
    </ContentForm>
  </BodyAuth>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios';
import { useStore } from 'vuex'; 
import { setLoading } from '../../redux/features/htmlElements';


export default {
  setup() {
    const router = useRouter(); 
    const store = useStore(); 
    const state = reactive({
      designation: '',
    });

    const handleSubmit = async () => {
      if (!state.designation) {
        alert('Veuillez bien remplir les champs');
        return;
      }

      const form = {
        designation: state.designation,
      };

      try {
        store.commit('setLoading', true);
        let response = await axios.post(`http://localhost:3000/categories`, form);
        if (response.status === 200) {
          router.push('/categories'); 
        } else {
          alert('Erreur');
        }
      } catch (error) {
        alert('Erreur lors de la création');
      } finally {
        store.commit('setLoading', false);
      }
    };

    return {
      handleSubmit,
      state,
    };
  },
};
</script>
