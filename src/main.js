import Vue from 'vue';
import App from './app.vue';
import './register-service-worker';
import router from './router';
import vuetify from './vuetify';
import './style.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
