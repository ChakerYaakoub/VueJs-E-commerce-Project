<template>
  <Body>
    <HeaderForm :content="'Inscription'" />

    <ContentForm @submit.prevent="handleRegister">
      <DivInput :modal="true">
        <Input
          id="firstName"
          type="text"
          label="Prenom"
          v-model="firstName"
          double
          @input="handleFirstName"
        />

        <Input
          id="lastName"
          type="text"
          label="Nom"
          v-model="lastName"
          double
          @input="handleLastName"
        />
      </DivInput>

      <DivInput :modal="true">
        <Input
          id="email"
          type="email"
          label="Email"
          v-model="email"
          @input="handleEmail"
        />
      </DivInput>

      <DivInput :modal="true">
        <Input
          id="password"
          type="password"
          label="Mot de passe"
          v-model="password"
          @input="handlePassword"
        />
      </DivInput>

      <DivInput :modal="true">
        <Button
          bgColor="#FFC107"
          textColor="#383F51"
          content="S'inscrire"
          :icon="false"
        />
      </DivInput>
    </ContentForm>
  </Body>
</template>
  
  <script>
import Body from "../components/Body.vue";
import ContentForm from "../components/ContentForm.vue";
import Input from "../components/Input.vue";
import DivInput from "../components/DivInput.vue";
import HeaderForm from "../components/HeaderForm.vue";
import Button from "../components/Button.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex"; // Import useStore from vuex
import { ref } from "vue";

export default {
  components: {
    Body,
    ContentForm,
    Input,
    DivInput,
    HeaderForm,
    Button,
  },
  setup() {
    const router = useRouter();
    const store = useStore(); // Use useStore to access the Vuex store

    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");

    const handleRegister = async () => {
      try {
        const body = {
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
        };

        const response = await axios.post(
          "http://localhost:3000/auth/register",
          body
        );

        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          const user = response.data.user;

          Cookies.set("access_token", accessToken, {
            expires: 7,
            secure: true,
          });
          Cookies.set("id", user.id, { expires: 7, secure: true });
          store.dispatch("user/loggedIn", true); // Dispatch the loggedIn action
          store.dispatch("user/actualUserSet", user); // Dispatch the actualUserSet action
          // router.push('/produits');
          window.location.href = "http://localhost:8080/produits";
        } else {
          alert("Veuillez entrer les bonnes informations");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    const handleEmail = (event) => {
      if (event && event.target && event.target.value) {
        email.value = event.target.value;
      }
    };

    const handlePassword = (event) => {
      if (event && event.target && event.target.value) {
        password.value = event.target.value;
      }
    };

    const handleLastName = (event) => {
      if (event && event.target && event.target.value) {
        handleLastName.value = event.target.value;
      }
    };
    const handleFirstName = (event) => {
      if (event && event.target && event.target.value) {
        handleFirstName.value = event.target.value;
      }
    };

    return {
      email,
      password,
      handleRegister,
      handleEmail,
      handlePassword,
      handleLastName,
      handleFirstName,
    };
  },
};
</script>
  
  <style scoped>
/* Add your scoped styles here */
</style>
  