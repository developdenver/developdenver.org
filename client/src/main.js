import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import hagrid from './hagrid';
import './registerServiceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);
library.add(faCoffee);
library.add(faTicketAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(hagrid, { store });

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
