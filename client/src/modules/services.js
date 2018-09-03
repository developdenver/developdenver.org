import user from "./user-service";
import payments from "./payment-service";
import loading from "./loading-service";

export default {
	namespaced: true,
	modules: {
		user,
		payments,
		loading,
	},
};
