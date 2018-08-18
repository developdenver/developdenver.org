const paymentKey = process.env.VUE_APP_STRIPE_KEY;

export default {
	namespaced: true,
	state: {
		paymentKey: process.env.VUE_APP_STRIPE_KEY,
		isError: false,
		message: "",
	},
	mutations: {
		setMessage(state, message) {
			state.message = message;
		},
	},
	actions: {
		charge({ dispatch, }, data) {
			return fetch(process.env.VUE_APP_PAYMENTS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(response => response.json())
				.then(response => {
					return dispatch("services/user/setAttendee", true, {root: true, });
				}).catch(error => {
					console.log(error.message);
				});
		},
	},
};
