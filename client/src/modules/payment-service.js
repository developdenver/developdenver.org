const paymentKey = process.env.VUE_APP_STRIPE_KEY;

export default {
	namespaced: true,
	state: {
		paymentKey,
		isError: false,
		message: '',
	},
	mutations: {
		setMessage(state, message) {
			state.message = message;
		},
	},
	actions: {
		async charge({ dispatch, rootState }, data) {
			dispatch('services/loading/pushLoading', {}, { root: true });
			const charge = await fetch(process.env.VUE_APP_PAYMENTS_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${rootState.services.user.token}`,
				},
				body: JSON.stringify(data),
			})
				.then(response => response.json())
				.catch(error => {
					console.error(error.message);
				});
			dispatch('services/loading/popLoading', {}, { root: true });
			return charge;
		},
	},
};
