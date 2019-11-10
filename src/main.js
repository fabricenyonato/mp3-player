import Vue from 'vue';
import App from './app.vue';
import './register-service-worker';
import router from './router';
import vuetify from './vuetify';
import './style.scss';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app');
