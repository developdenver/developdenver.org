import Model from "./model";
import { buildUrl } from "./adapter";
import { deserialize } from "./deserializer";
const apiUrl = process.env.VUE_APP_API_URL;

class Talk extends Model {
	constructor(talk) {
		super("talk", talk);
	}
	static fetchAll(modelName, token) {
		const url = buildUrl(modelName);
		return fetch(url, {
			headers: {
				'Authorization': token? `Bearer ${token}`: undefined
			},
			})
			.then(res => res.json())
			.then(({ data }) => data.map(deserialize));
	}
	vote(token) {
		const url = this.buildUrl(this.modelName, this.id);
		return fetch(`${url}/vote`, {
			method: "POST",
			headers: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
	}
	unvote(token) {
		const url = this.buildUrl(this.modelName, this.id);
		return fetch(`${url}/unvote`, {
			method: "POST",
			headers: {
				"Authorization": token ? `Bearer ${token}` : undefined
			},
		}).then(response => response.json())
	}
}

export default Talk;
