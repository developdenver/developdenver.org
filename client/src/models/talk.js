import Model from "./model";
import { deserialize } from "./deserializer";
const apiUrl = process.env.VUE_APP_API_URL;

const fetchJSON = url => fetch(url).then(responseJSONError);

const responseJSONError = response => response
	.clone()
	.json()
	.catch(() => response.text())
	.then(result => {
		if (response.ok) {
			return result;
		}
		throw new Error(result.error || result);
	});

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
			header: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
}

export default Talk;
