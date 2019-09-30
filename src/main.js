import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import firebaseInit from "@/components/firebase/firebaseInit";
const firebase = require('firebase/app');

Vue.use(VueResource);
Vue.config.productionTip = false;

let app ='';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
