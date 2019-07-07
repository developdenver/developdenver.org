import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hagrid from "./hagrid";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faTicketAlt, faBars, faTimes, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

// This kills any old service workers
(function killServiceWorker(){
	if (navigator.serviceWorker){
		navigator.serviceWorker.getRegistrations().then(registrations => {
			console.log("Killing service workers");
			for (let registration of registrations) {
				console.log("Found a registration");
				registration.unregister().then(() => {
					console.log("Unregistered");
					return self.clients.matchAll();
				}).then(clients => {
					console.log("Found the client");
					clients.forEach(client => {
						console.log("Found a browser");
						if (client.url && "navigate" in client){
							console.log("Refreshing...");
							client.navigate(client.url);
						}
					});
				});
			}
		});
	}
})();


library.add(fab);
library.add(faCoffee);
library.add(faTicketAlt);
library.add(faBars);
library.add(faTimes);
library.add(faShare);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(hagrid, { store });

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
