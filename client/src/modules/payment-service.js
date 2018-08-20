const paymentKey = process.env.VUE_APP_STRIPE_KEY;

export default {
	namespaced: true,
	state: {
		paymentKey,
		isError: false,
		message: "",
	},
	mutations: {
		setMessage(state, message) {
			state.message = message;
		},
	},
	actions: {
		async charge({ dispatch }, data) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			const charge = await fetch(process.env.VUE_APP_PAYMENTS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(response => response.json())
				.catch(error => {
					console.log(error.message);
				});
			dispatch("services/loading/popLoading", {}, { root: true });
			return charge;
		},
	},
};
