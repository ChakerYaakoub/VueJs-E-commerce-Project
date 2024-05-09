import { createWebHistory } from 'vue-router';

import Connexion from '../pages/Connexion.vue';
import Inscription from '../pages/Inscription.vue';
import Produit from '../pages/Products/Index.vue';
import ProduitAdd from '../pages/Products/Add.vue';
import ProduitEdit from '../pages/Products/Edit.vue';
import Categorie from '../pages/Categories/Index.vue';
import CategorieAdd from '../pages/Categories/Add.vue';
import CategorieEdit from '../pages/Categories/Edit.vue';
import NotFound from '@/components/NotFound.vue';
import Panier from '@/components/Panier.vue';


const routes = [
  { path: '/', component: Connexion },
  { path: '/inscription', component: Inscription },
  { path: '/produits', component: Produit },
  { path: '/produits/add', component: ProduitAdd },
  { path: '/produits/edit/:id', component: ProduitEdit },
  { path: '/categories', component: Categorie },
  { path: '/categories/add', component: CategorieAdd },
  { path: '/categories/edit/:id', component: CategorieEdit },
  { path: '/panier', component: Panier },

    { path: '/:pathMatch(.*)*', component: NotFound }, 
];

export { routes }; 
