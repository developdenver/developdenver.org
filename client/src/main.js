import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {fab} from "@fortawesome/free-brands-svg-icons";

library.add(fab);
library.add(faCoffee);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate(){
		this.$store.commit("initializeStore");
	},
}).$mount("#app");
