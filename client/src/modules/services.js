import user from "./user-service";
import payments from "./payment-service";
import loading from "./loading-service";
import talk from "./talks-service";

import Talk from "../models/talk";

console.log(Talk)

export default {
	namespaced: true,
	modules: {
		user,
		payments,
    loading,
    talk,
	},
};
