<template>
  <BodyAuth>
    <div class="w-full flex justify-end mb-1">
      <Button
        v-if="info.user.role === 0"
        bgColor="#FFC107"
        textColor="#383F51"
        content="faPlus"
        icon
        class="lg:px-4 lg:py-0 md:px-6"
        @click="handleAddProduit"
      />
    </div>

    <!-- Table for desktop -->
    <table class="w-full rounded-lg" ref="tableRef">
      <!-- Table header -->
      <thead>
        <tr>
          <th
            class="h-[3rem] md:h-16 lg:h-10 px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
          >
            Nom
          </th>
          <th
            class="h-[3rem] md:h-16 lg:h-10 px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
          >
            Actions
          </th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <!-- Rows will be dynamically populated here -->
      </tbody>
    </table>

    <!-- Table for mobile -->
    <!-- Combined table -->
    <table class="w-full rounded-lg" ref="tableRef">
      <thead>
        <tr>
          <th
            class="h-[3rem] md:h-16 lg:h-10 px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
          >
            Nom
          </th>
          <th
            class="h-[3rem] md:h-16 lg:h-10 px-2 text-center bg-[#383F51] text-[#989FCE] border-r-[1px] border-[#989FCE] rounded-lg rounded-b-none"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Render rows -->
        <tr
          v-for="(category, index) in categories"
          :key="index"
          class="hidden border-b-[1px] border-[#989FCE]"
        >
          <td
            class="h-[3rem] md:h-[5rem] lg:h-[3rem] px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
          ></td>
          <td
            :id="category.id"
            class="h-[3rem] md:h-[5rem] lg:h-[3rem] actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
          >
            <div class="flex w-full justify-center space-x-3">
              <!-- Render buttons based on user role -->
              <button
                v-if="info.user.role === 0"
                @click="handleEditProduit(category.id)"
                class="..."
              >
                <i class="...">Edit</i>
              </button>
              <button
                v-if="info.user.role === 0"
                @click="handleDeleteCategorie(category.id)"
                class="..."
              >
                <i class="...">Delete</i>
              </button>
            </div>
          </td>
        </tr>
        <!-- Render additional rows if needed -->
        <tr
          v-for="index in 5 - categories.length"
          :key="`additional-${index}`"
          class="hidden border-b-[1px] border-[#989FCE]"
        >
          <td
            class="h-[3rem] md:h-[5rem] lg:h-[3rem] px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
          ></td>
          <td
            class="h-[3rem] md:h-[5rem] lg:h-[3rem] actionTd px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
          ></td>
        </tr>
        <!-- Render no data row if categories are empty -->
        <tr
          v-if="categories.length === 0"
          ref="noneRowRef"
          class="noneRow hidden border-b-[1px] border-[#989FCE]"
        >
          <td
            colspan="2"
            class="h-[3rem] md:h-[5rem] lg:h-[3rem] px-2 py-1 text-center bg-[#6D768E] text-[#FFC107] border-r-[1px] border-[#989FCE] whitespace-normal break-words"
          >
            Aucun enregistrement
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Navigation buttons -->
    <div class="flex justify-center text-[#FFC107] rounded-lg mt-5">
      <div class="flex-1 border-r-2 border-[#989FCE] mt-5">
        <button
          @click="handlePrecedent"
          :class="{ 'cursor-not-allowed': actualPage <= 1 }"
          class="px-6 md:px-14 lg:px-14 text-xs md:text-lg lg:text-base py-2 bg-[#6D768E] rounded-lg rounded-r-none transition-all duration-300 hover:bg-opacity-75"
        >
          Précedent
        </button>
      </div>
      <div class="flex-1 mt-5">
        <button
          @click="handleSuivant"
          :class="{ 'cursor-not-allowed': actualPage >= maxPage }"
          class="px-6 md:px-14 lg:px-14 text-xs md:text-lg lg:text-base py-2 bg-[#6D768E] rounded-lg rounded-l-none transition-all duration-300 hover:bg-opacity-75"
        >
          Suivant
        </button>
      </div>
    </div>
  </BodyAuth>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore, use } from "vuex";
import { useRouter, useRoute } from "vue-router"; // Import useRouter instead of useNavigate
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const htmlElements = computed(() => store.state.htmlElements);
    const actualPage = computed(
      () => store.state.htmlElements.actualPageCategorie
    );
    const maxPage = computed(() => store.state.htmlElements.maxPage);
    const info = computed(() => store.state.user);
    const router = useRouter(); // Import useRouter from vue-router
    const tableRef = ref(null);
    const tablePhoneRef = ref(null);

    // Fontions utiles
    const reloadPage = () => {
      location.reload();
    };

    const getId = (element) => {
      let currentElement = element;

      while (currentElement) {
        if (currentElement.tagName === category + "TD") {
          return currentElement.getAttribute("id");
        }
        currentElement = currentElement.parentNode;
      }
      return null;
    };

    const getProductInfo = async (id) => {
      try {
        let response = await axios.get(`http://localhost:3000/produits/${id}`);
        let data = await response.data;
        return data;
      } catch (error) {
        return null;
      }
    };

    // CRUD bouttons
    const handleAddProduit = () => {
      router.push("/categories/add");
    };

    const handleEditProduit = (event) => {
      let item = event.target;
      let id = getId(item);
      router.push(`/categories/edit/${id}`);
    };

    const handleDeleteCategorie = async (event) => {
      event.preventDefault();

      let confirmation = confirm(
        "Voulez-vous vraiment supprimer la categorie ?"
      );
      if (confirmation) {
        let item = event.target;
        let id = getId(item);

        if (id) {
          let response = await axios.delete(
            `http://localhost:3000/categories/${id}`
          );
          if (response.status == 200) {
            reloadPage();
          }
        } else {
          alert("Impossible de supprimer le produit");
        }
      }
    };

    // Bouttons arrière et avant
    const handlePrecedent = () => {
      if (actualPage > 1) {
        dispatch(setActualPageCategorie(actualPage - 1));
      }
    };

    const handleSuivant = () => {
      if (maxPage > actualPage) {
        dispatch(setActualPageCategorie(actualPage + 1));
      }
    };

    // Mise en page
    const handleLayout = () => {
      onMounted(() => {
        // Your useLayoutEffect logic will go here
        let table = tableRef.value;
        let tablePhone = tablePhoneRef.value;
        let bodyWidth = htmlElements.bodyAuthWidth;
        let oneByOneWidth = bodyWidth / 4;

        let mediaQuery = window.matchMedia("(min-width: 768px)");
        let th = null;
        let td = null;

        const tableChange = () => {
          if (mediaQuery.matches) {
            table.classList.remove("hidden");
            tablePhone.classList.add("hidden");

            th = table.querySelectorAll("th");
            td = table.querySelectorAll("td");

            th.forEach((element) => {
              element.style.minWidth = oneByOneWidth + "px";
              element.style.maxWidth = oneByOneWidth + "px";
            });

            td.forEach((element) => {
              element.style.minWidth = oneByOneWidth + "px";
              element.style.maxWidth = oneByOneWidth + "px";
            });
          } else {
            table.classList.add("hidden");
            tablePhone.classList.remove("hidden");

            th = tablePhone.querySelectorAll("th");

            th.forEach((element, index) => {
              element.style.minWidth = bodyWidth * 0.5 + "px";
              element.style.maxWidth = bodyWidth * 0.5 + "px";
            });

            td = tablePhone.querySelectorAll("td");

            td.forEach((element, index) => {
              element.style.minWidth = bodyWidth * 0.5 + "px";
              element.style.maxWidth = bodyWidth * 0.5 + "px";
            });
          }
        };

        tableChange();

        const handleResize = () => {
          tableChange();
        };

        window.addEventListener("resize", handleResize);
      });
    };

    // Chargement des données
    const handleDataLoading = () => {
      onMounted(() => {
        // Your useLayoutEffect logic will go here
        setDisableBtn([]);
        let table = tableRef.value;
        let tablePhone = tablePhoneRef.value;
        let noneRowPc = noneRowPcRef.value;
        let noneRowPhone = noneRowPhoneRef.value;

        let addBtn = addBtnRef.value;

        store.commit("htmlElements/setLoading", true);
        const getProduits = async () => {
          try {
            let response = await axios.get(
              `http://localhost:3000/categories?page=${actualPage}`
            );
            let data = await response.data;

            setMaxPage(data.totalPages);

            let trPc = table.querySelectorAll("tbody tr");
            let trPhone = tablePhone.querySelectorAll("tbody tr");

            let taken = 0;

            data.categories.forEach((element, index) => {
              let user = info.user;

              // Pour le pc
              let trPcElement = trPc[index];
              trPcElement.classList.remove("hidden");
              let Designation = trPcElement.querySelector("td:nth-child(1)");
              let actionPc = trPcElement.querySelector("td:nth-child(2)");

              Designation.innerHTML = element.designation;
              actionPc.setAttribute("id", element.id);

              if (user.role == 1) {
                let nombre = actionPc.querySelectorAll("button").length;

                if (nombre == 2) {
                  let modifBtn = actionPc.querySelector("button:nth-child(1)");
                  let suppBtn = actionPc.querySelector("button:nth-child(2)");

                  modifBtn.remove();
                  suppBtn.remove();
                }
              }

              // Pour le telephone
              let trPhoneElement = trPhone[index];
              trPhoneElement.classList.remove("hidden");
              let designation = trPhoneElement.querySelector(
                "td:nth-child(1) span:nth-child(1)"
              );
              let actionPhone = trPhoneElement.querySelector("td:nth-child(2)");

              designation.innerHTML =
                "<b>Designation:</b>" + "<pre> </pre>" + element.designation;
              actionPhone.setAttribute("id", element.id);

              taken++;
            });

            for (let i = 0; i < 5; i++) {
              trPc[i].classList.remove("hidden");
              trPhone[i].classList.remove("hidden");
            }

            for (let i = taken; i < 5; i++) {
              if (trPc[i]) {
                if (trPc[i] != noneRowPc) {
                  trPc[i].classList.add("hidden");
                }
              }

              if (trPhone[i]) {
                if (trPhone[i] != noneRowPhone) {
                  trPhone[i].classList.add("hidden");
                }
              }
            }

            if (taken == 0) {
              noneRowPc.classList.remove("hidden");
              noneRowPhone.classList.remove("hidden");
            } else {
              noneRowPc.classList.add("hidden");
              noneRowPhone.classList.add("hidden");
            }
          } catch (error) {
            console.log(error.message);
          }
        };

        getProduits();
        store.commit("htmlElements/setLoading", false);
      });
    };

    return {
      htmlElements,
      actualPage,
      info,
      tableRef,
      tablePhoneRef,
      reloadPage,
      getId,
      getProductInfo,
      handleAddProduit,
      handleEditProduit,
      handleDeleteCategorie,
      handlePrecedent,
      handleSuivant,
      handleLayout,
      handleDataLoading,
    };
  },
};
</script>
