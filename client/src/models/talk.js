import Model from "./model";
const apiUrl = process.env.VUE_APP_API_URL;

class Talk extends Model {
	constructor(talk) {
		super("talk", talk);
	}
	async vote(token) {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(`${url}/vote`, {
			method: "POST",
			headers: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
	async unvote(token) {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(`${url}/unvote`, {
			method: "POST",
			headers: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
	static async fetchVotes(token) {
		const url = `${apiUrl}/votes`;
		const data = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
}

export default Talk;
