import Model from "./model";
import { deserialize } from "./deserializer";

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
	async vote() {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(`${url}/vote`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: this.serialize(),
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
	async unvote() {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(`${url}/unvote`, {
			method: "DELETE",
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
	fetchAllVoted() {
		const url = this.buildUrl(this.modelName, this.id);
		return fetchJSON(url)
			.then(({ data }) => data.map(deserialize))
			.catch(error => console.error(error.message));
	}
}

export default Talk;
