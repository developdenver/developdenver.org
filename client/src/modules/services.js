import user from "./user-service";
import payments from "./payment-service";

export default {
	namespaced: true,
	modules: {
		user,
		payments,
	},
};
