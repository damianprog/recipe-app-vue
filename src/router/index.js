import Vue from 'vue'
import Router from 'vue-router'
import RecipesAuth from '@/components/firebase/RecipesAuth'
import RecipesPanel from '@/components/panel/RecipesPanel'
import firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: RecipesAuth
        },
        {
            path: '/home',
            name: 'home',
            component: RecipesPanel,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
   const currentUser = firebase.auth().currentUser;
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if(requiresAuth && !currentUser) {
       next('login');
   }
   else if (!requiresAuth && currentUser) {
       next('home');
   }
   else {
       next();
   }
});

export default router;