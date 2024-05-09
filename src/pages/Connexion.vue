<template>
  <Body>
    <HeaderForm :content="'Authentification'" />
    <ContentForm @submit.prevent="handleLogin">
      <DivInput :modal="true">
        <Input
          id="email"
          type="email"
          label="Email"
          :value="email"
          @input="handleEmailChange"
        />
      </DivInput>
      <DivInput :modal="true">
        <Input
          id="password"
          type="password"
          label="Mot de passe"
          :value="password"
          @input="handlePasswordChange"
        />
      </DivInput>
      <DivInput :modal="true">
        <Button
          bgColor="#FFC107"
          textColor="#383F51"
          content="Se connecter"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import userModule from "../redux/features/userSlice"; // Import userModule directly

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
    const store = useStore();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      try {
        const body = {
          email: email.value,
          password: password.value,
        };

        const response = await axios.post(
          "http://localhost:3000/auth/login",
          body
        );

        if (response && response.status === 200) {
          console.log(response.data);
          const accessToken = response.data.accessToken;
          const user = response.data.user;
          console.log(user);

          Cookies.set("access_token", accessToken, {
            expires: 7,
            secure: true,
          });
          Cookies.set("id", user.id, { expires: 7, secure: true });

          // store.commit(userModule.mutations.loggedIn, true); // Dispatch the mutation from userModule
          // store.commit(userModule.mutations.actualUserSet, user); // Dispatch the mutation from userModule
          store.commit("loggedIn", true);
          store.commit("actualUserSet", user);

          router.push("/produits");
          // window.location.href = "http://localhost:8080/produits";
        } else {
          alert("Veuillez entrer les bonnes informations");
        }
      } catch (error) {
        console.error("Error during login:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    const handleEmailChange = (event) => {
      if (event && event.target && event.target.value) {
        email.value = event.target.value;
      }
    };

    const handlePasswordChange = (event) => {
      if (event && event.target && event.target.value) {
        password.value = event.target.value;
      }
    };

    return {
      email,
      password,
      handleLogin,
      handleEmailChange,
      handlePasswordChange,
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
